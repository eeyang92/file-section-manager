# Section Manager

Lightweight section management of Files. Wraps `section-manager`.

## Installation

- `npm install file-section-manager`, or
- `yarn add file-section-manager`

## Example

```typescript
import * as fs from 'fs'

import { FileSectionManager } from 'file-section-manager'

const absoluteFilePath = '/my/package/dir/file.ts'

const fileSectionManager = new FileSectionManager(absoluteFilePath)

const updatedSection = ['One', 'Two', 'Three']

fileSectionManager.findAndUpdateSection('MySection', updatedSection)

fileSectionManager.writeSync() // This will write to the file on disk

console.log(fileSectionManager.toString())
```

```typescript
/* Output
Hello
World!

<-- MySection

One
Two
Three

--> MySection

Bye!
*/

```

## API

- This module primarily exports `FileSectionManager`
- This module also re-exports all exports of `SectionManager`

### FileSectionManager
```typescript
FileSectionManager(absolutePathFileName: string, options: SectionManagerOptions): FileSectionManager
```

```typescript
type SectionManagerOptions = {
    padding?: boolean,
    sectionSyntax?: {
        start: (name) => string,
        end: (name) => string
    }
}
```

- `padding`: controls whether or not there should be a new line after the section start and before the section end
    - This setting can be overridden on the update methods
- `sectionSyntax`: gives the developer control over the syntax for delimiting each section
    - Defaults:
        - start: ``(name) => `<-- ${ name }` ``
        - end: ``(name) => `--> ${ name }` ``

### Methods

#### findAndUpdateSection
```typescript
findAndUpdateSection(section: string, sectionContentArray: string[], padding?: boolean): void
```

#### prependToSection
```typescript
prependToSection(section: string, sectionContentArray: string[]): void
```

#### appendToSection
```typescript
appendToSection(section: string, sectionContentArray: string[]): void
```

#### toString
```typescript
toString(): string
```

The following are internal methods, but are exposed for cases that require manual control

#### findSection
```typescript
findSection(section: string): {
    startSection: number,
    endSection: number,
    indentChars: number,
    section: string[]
}
```

#### updateSection
```typescript
updateSection(options: UpdateSectionOptions): void
```

```typescript
type UpdateSectionOptions = {
    startSection: number,
    endSection: number,
    indentChars: string,
    sectionContentArray: string[],
    padding?: boolean
}
```

#### setFileArray
```typescript
setFileArray(fileArray: string[]): void
```

#### getFileArray
```typescript
getFileArray(): string[]
```

## Extending

You can extend the behavior by extending the base class `SectionManager`. For example, this module does just that:

```typescript
import * as fs from 'fs'

import { SectionManager } from 'section-manager'

export class FileSectionManager extends SectionManager {
    absolutePathFileName: string

    constructor(absolutePathFileName: string, options: SectionManagerOptions) {
        super(options)

        if (!fs.existsSync(absolutePathFileName) ){
            throw new Error('File not found')
        }

        this.absolutePathFileName = absolutePathFileName

        this.readSync()
    }

    readSync() {
        const fileString = fs.readFileSync(this.absolutePathFileName).toString()

        this.setFileArray(fileString.split('\n'))
    }

    writeSync() {
        fs.writeFileSync(this.absolutePathFileName, this.getFileArray().join('\n'))
    }
}
```
