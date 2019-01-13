# translation-utils

Javascript tools for the techie who wants to learn a language.

This package is a set of tools designed to be extendable for use in helping everyone learn new languages.

# Contents

Right now this is mostly for someone who knows English and wants to learn Swedish but you could easily
fork it and set it up to have settings for other languages.

NOTE: Using Glosbe you will have a limit to your IP on the number of words you can translate in a period
of time. If you hit the limit, just visit Glosbe.com and verify for your IP.

# Examples

## CLI Help

    node --experimental-modules index.mjs --help
    
## Translate a Web Page (using Glosbe by default)

    node --experimental-modules sortAndTranslate.mjs \
      --url "https://sverigesradio.se/sida/artikel.aspx?programid=4916&artikel=7130511"