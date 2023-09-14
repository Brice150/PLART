export interface Object {
  id: number;
  name: string;
  category: string;
  description: string;
  fileToDownload: string;
  image: string | ArrayBuffer;
  nickname: string;
  fkUser: any;
}
