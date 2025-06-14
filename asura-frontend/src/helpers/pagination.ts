export interface IPagination<T> {
  total: number;
  page: number;
  pageSize: number;
  items: T[];
}
//Class nay chua du lieu cho viec phan trang, giup ta co the quan ly, su dung
//cac thuoc tinh tren
