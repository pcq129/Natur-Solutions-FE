export interface IProductDetail {
  id: number,
  name: string,
  productImages: [string]|IProductFile,
  productVideo?: IProductFile,
  productDocuments?: IProductFile[],
  sections: IProductSection[],
  services: IProductServcie[],
  minimumQuantity: number
}


export interface IProductFile{
  id: number,
  filePath?: string,
  fileType?: number | null,
  fileName?: string | null
}

export interface IProductSection{
  name: string,
  content: string,
  type: number,
  priority: number,
  product_id: number
}

export interface IProductServcie{
  id: number,
  name: string,
  firstService?: number | null,
  secondService?: number | null ,
  thirdService?: number | null
}