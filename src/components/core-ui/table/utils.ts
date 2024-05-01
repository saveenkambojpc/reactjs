function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = "asc" | "desc";

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface HeadCell {
  disablePadding: boolean;
  id: string | number;
  label: string;
  numeric: boolean;
}

export function createHeadCell(
  id: string | number,
  label: string,
  numeric: boolean,
  disablePadding: boolean
): HeadCell {
  return { id, label, numeric, disablePadding };
}

export function applyFilter<T>(
  inputData: T[],
  // comparator: (a: T, b: T) => number,
  filterName?: string,
  filterByUserId?: string
): T[] {
  // const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  // stabilizedThis.sort((a, b) => {
  //   const order = comparator(a[0], b[0]);
  //   if (order !== 0) return order;
  //   return a[1] - b[1];
  // });

  // inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (row: any) =>
        row.name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterByUserId) {
    inputData = inputData.filter((row: any) => row.user_id === filterByUserId);
  }

  return inputData;
}
