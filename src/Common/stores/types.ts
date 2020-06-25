import { OptionType, OptionsType } from '../../Commute/components/types'

export interface PaginationStoreInterface {
   apiStatus: number
   apiError: string | null
   entities: Map<any, any>
   currentPage: number
   selectedSort: OptionType | null
   selectedFilter: OptionType | null
   selectedSortOrder: string
   sortOptions: OptionsType
   filterOptions: OptionsType
   totalEntitiesCount: number
   totalPages: number
   limit: number
   getEntitiesAPI: any
   model: any
   entitiesKey: string
   totalKey: string
   filterOptionsAccessKey: string
   sortOptionsAccessKey: string
   filterKey: string
   sortOrderKey: string
   sortByKey: string

   init: () => void
   setTotalPages: (total: number) => void
   onChangeSort: (filter: OptionType) => void
   onChangeFilter: (filter: OptionType) => void
   clearEntitiesAndGetData: () => void
   onChangeSortOrder: (sortOrder: string) => void
   convertCamelCaseToUpperCase: (str: string) => string
   setApiStatus: (status: number) => void
   setApiError: (error: any) => void
   setApiResponse: (response: any) => void
   getValue: (option: OptionType | null) => string | null
   getEntities: () => Promise<any> | void
   onChangePage: (page: number) => void
   offset: number
   currentPageEntities: any
   clearStore: () => void
}
