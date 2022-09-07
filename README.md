# Dutch-ipa

A website that shows you the IPA transcription of a Dutch sentence.

![Screenshot - Dutch IPA](./.github/screenshot.png)

Try it now! [https://dutch-ipa.deno.dev/](https://dutch-ipa.deno.dev/)

## Features

- IPA transcription for every single word
- Translation into another language (coming)
- Pronunciation of the sentence (coming)

## Installation

You can use the [latest online version](https://dutch-ipa.deno.dev/) which doesn't require any installation.

To install the website locally, you first need to have [Deno](https://deno.land) installed.
You might also need a Redis database.

Copy the `.env.example` file to `.env` and fill in the required values.

The credentials are for a **Redis database**.

## Usage

### Development

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

### Production

Build the project:

You must have run the project in development mode at least once to build the application (generate routes).

```
deno run -A main.ts
```

## FAQ

### There is sometimes a thinking emoji (🤔) in the IPA transcription

> This means that no IPA transcription has been found for the corresponding word.

### There are errors in the IPA transcription

> This is because of how the source of data we use works. When a verb is conjugated, or when a word is in plural, the source redirects to the base form of the word.
>
> I am aware of this and am working on a solution.

### What source of data do you use?

> For the IPA:
> - Dutch:
>	- [Woorden.org](https://www.woorden.org/)
>	- [Dutch Wiktionary](https://nl.wiktionary.org/) (planned, as backup)
> For the translation:
> - [Google Translate](https://translate.google.com/)
> Pronunciation:
> - [Google Translate](https://translate.google.com/)

### Are you going to add more languages?

> Eventually, yes.
