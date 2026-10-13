import * as runtime from "@prisma/client/runtime/index-browser";
export const Decimal = runtime.Decimal;
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    Category: 'Category',
    Author: 'Author',
    Book: 'Book',
    Member: 'Member',
    Loan: 'Loan'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const CategoryScalarFieldEnum = {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const AuthorScalarFieldEnum = {
    id: 'id',
    name: 'name',
    bio: 'bio',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const BookScalarFieldEnum = {
    id: 'id',
    isbn: 'isbn',
    title: 'title',
    publishedYear: 'publishedYear',
    totalCopies: 'totalCopies',
    availableCopies: 'availableCopies',
    categoryId: 'categoryId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const MemberScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const LoanScalarFieldEnum = {
    id: 'id',
    bookId: 'bookId',
    memberId: 'memberId',
    borrowedAt: 'borrowedAt',
    dueAt: 'dueAt',
    returnedAt: 'returnedAt',
    lateFee: 'lateFee'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map