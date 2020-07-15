import React from 'react'

interface PaginationTestModelType {
   id: number
   key1: string
   key2: string
   key3: string
}

class PaginationTestModel {
   id: number
   key1: string
   key2: string
   key3: string
   constructor(dataObj: PaginationTestModelType) {
      this.id = dataObj.id
      this.key1 = dataObj.key1
      this.key2 = dataObj.key2
      this.key3 = dataObj.key3
   }
}
export default PaginationTestModel
