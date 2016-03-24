package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"
	"time"
)

const (
	timeFormat = "1/02/06"
)

type transaction struct {
	Id          int    `json:"id"`
	HasCheck    bool   `json:"hasCheck,omitempty"`
	Created_at  string `json:"created_at"`
	Description string `json:"description"`
        StatementD  string `json:"statement_description"`
	Amount      string `json:"amount"`
	Balance     string `json:"balance"`
	Category    string `json:"category"`
	AccountId   int    `json:"accountId"`
}

func main() {
	for _, filename := range os.Args[1:] {
		infile, err := os.Open(filename)
		if err != nil {
			log.Println(err.Error())
			continue
		}
		outfile, err := ioutil.TempFile(os.TempDir(), "js")
		decoder := json.NewDecoder(infile)
		_, err = decoder.Token()
		if err != nil {
			log.Fatal(err)
		}
		outfile.WriteString("[")
		var data transaction
		offset := make(map[int]time.Duration)
		oneDay, err := time.ParseDuration("-48h")
		for decoder.More() {
			data.HasCheck = false
			decoder.Decode(&data)
			parsed, err := time.Parse(timeFormat, data.Created_at)
			var off time.Duration
			var ok bool
			if off, ok = offset[data.AccountId]; !ok {
				// first date we see is assumed the newest
				if err != nil {
					log.Fatalf("could not format %s", data.Created_at)
				}
				offset[data.AccountId] = time.Since(parsed)
				fmt.Printf("adjusted dates offset %+v\n", offset[data.AccountId])
				off = offset[data.AccountId]
			}
			// move the date up the corresponding amount
			newDate := parsed.Add(off).Add(oneDay)
			data.Created_at = newDate.Format(timeFormat)

			out, _ := json.MarshalIndent(data, "", "    ")
			outfile.Write(out)
			if decoder.More() {
				outfile.WriteString(", ")
			}
		}
		_, err = decoder.Token()
		if err != nil {
			log.Fatal(err)
		}
		outfile.WriteString("]")
		infile.Close()
		outfile.Close()
		copyFileContents(outfile.Name(), filename)
		os.Remove(outfile.Name())
	}
}
func copyFileContents(src, dst string) (err error) {
	in, err := os.Open(src)
	if err != nil {
		return
	}
	defer in.Close()
	out, err := os.Create(dst)
	if err != nil {
		return
	}
	defer func() {
		cerr := out.Close()
		if err == nil {
			err = cerr
		}
	}()
	if _, err = io.Copy(out, in); err != nil {
		return
	}
	err = out.Sync()
	return
}
