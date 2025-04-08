# Dutch-ipa

[![Made with Fresh](https://fresh.deno.dev/fresh-badge-dark.svg)](https://fresh.deno.dev)

Try it now! [https://dutch-ipa.deno.dev/](https://dutch-ipa.deno.dev/)

A website that shows you the IPA transcription of a Dutch sentence.

![Screenshot - Dutch IPA](./.github/screenshot.png)

## Features

- IPA transcription for every single word
- Builtin IPA table, for reference, as well as example words, link to corresponding
  Wiktionary page, etc.
- Pronunciation of the whole sentence, as well as for every single word (planned)
- Translation into English (planned, unsured tho)

## Installation

1. Requirements:

   - [Deno](https://deno.land/) (1.32+)
   - an internet connection (for the backend to fetch the pronunciations)

2. Clone the repository:

   ```bash
   git clone https://github.com/Ascor8522/dutch-ipa.git
   cd dutch-ipa
   ```

3. Set the environment variables:

   Copy the `.env.example` file to `.env` and fill in the required values.

   Leave the `DENO_KV_ACCESS_TOKEN` variable empty if you want to use your local
   Deno KV database. This is recommended for development.

## Usage

### Development

1. Start the dev server:

   ```bash
   deno task start
   ```

   This will watch the project directory and restart the dev server as necessary.

### Production

1. Build the project:

   ```bash
   deno task build
   ```

   This will build the project and generate the routes.

2. Start the server:

   ```bash
   deno run -A main.ts
   ```

## FAQ

### There is sometimes a thinking emoji (🤔) in the IPA transcription

> This means that no IPA transcription has been found for the corresponding word.

### There are errors in the IPA transcription

> This is because of how the source of data we use works.
> When a verb is conjugated, or when a word is in its plural form,
> the source redirects to the base form of the word.
>
> I am aware of this and am working on a solution.

### What source of data do you use?

> For the IPA:
>
> - Dutch:
> - [Woorden.org](https://www.woorden.org/)
> - [woordenlijst.org](https://www.woordenlijst.org/) (planned)
> - [Dutch Wiktionary](https://nl.wiktionary.org/) (planned, as backup)
> For the translation:
> - [Google Translate](https://translate.google.com/)
> For the Pronunciation:
> - [Google Translate](https://translate.google.com/)

### Are you going to add more languages?

> No, this project was mainly made for Dutch; tho it is technically possible
> and quite easy to add more languages.
