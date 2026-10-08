# Forest typography

Part of the Forest build brief. Forest is premium, playful and interactive at
once, so the type needs tension, not the usual "luxury = serif" look.

**Principle: sans = Forest the product. Serif = Forest the personality.**

## Typefaces

| Role         | Brief choice      | What ships                       | Why                                                  |
| ------------ | ----------------- | -------------------------------- | ---------------------------------------------------- |
| Product (UI) | Söhne             | **Inter Tight** (Google Fonts)   | Söhne is commercial. Inter Tight is the free stand-in the brief names. Swap in Söhne once licensed. |
| Personality  | Instrument Serif  | **Instrument Serif** (Google)    | Editorial, playful, slightly unexpected.            |

No other families. Instrument Serif ships in regular and italic only; it is
never bolded (`font-synthesis: none` stops the browser faking a bold).

## Where each one goes

| Element             | Typeface         | Treatment                    | Token            |
| ------------------- | ---------------- | ---------------------------- | ---------------- |
| Hero headline       | Instrument Serif | Large, expressive            | `--type-hero`    |
| Page titles         | Instrument Serif | Large                        | `--type-h1`      |
| Section headlines   | Instrument Serif | Medium/large                 | `--type-h2`      |
| Sub-section titles  | Instrument Serif | Medium                       | `--type-h3`      |
| Accent word in any headline | Instrument Serif | *Italic*             | `h1–h3 em`       |
| Mascot (Pip) dialogue | Instrument Serif | *Italic*, playful          | `--type-voice`   |
| Interactive prompts | Instrument Serif | *Italic*, conversational     | `--type-voice`   |
| Margin notes        | Instrument Serif | *Italic*, tilted             | `.hand`          |
| Body                | Inter Tight      | Clean, restrained            | `--type-body`    |
| Lead paragraphs     | Inter Tight      | Larger body                  | `--type-lead`    |
| Navigation          | Inter Tight      | Small, slightly tracked      | DesktopNav       |
| Buttons             | Inter Tight      | Semibold                     | Button           |
| Product and dish names | Inter Tight   | Strong (600)                 | `--type-h4`, featured: `--type-name-lg` |
| Prices and figures  | Inter Tight      | Clean, prominent, tabular    | `--type-price`, `--type-number` |
| Metadata and eyebrows | Inter Tight    | Small + uppercase, tracked   | `--type-label`   |
| Journal article body | Inter Tight     | 1.125rem / 1.7 for reading   | ArticleBody      |

Example of the intended contrast: a serif headline with one italic accent
("Dinner, *decided* together."), and underneath it a clean sans interaction
("Cozy · Curious · Starving").

## Rules for contributors

1. Components never choose a font, size or weight directly. They use a role
   from `app/styles/type.css` (`font: var(--type-h2); letter-spacing: var(--track-h2);`).
2. Headings get at most one italic accent word.
3. If it can be tapped, bought or read for information, it is sans.
   If it speaks (Pip, a prompt, a headline), it is serif.
4. The sans has two weights in use: 400 for reading, 600–700 for emphasis.
