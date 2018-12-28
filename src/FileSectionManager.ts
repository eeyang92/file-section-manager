import * as fs from 'fs'

import {
    StringSectionManager,
    SectionManager,
    SectionManagerOptions,
    UpdateSectionOptions
} from 'section-manager'

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

export { UpdateSectionOptions }
export { SectionManagerOptions }
export { SectionManager }
export { StringSectionManager }
