import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BookModel = runtime.Types.Result.DefaultSelection<Prisma.$BookPayload>;
export type AggregateBook = {
    _count: BookCountAggregateOutputType | null;
    _avg: BookAvgAggregateOutputType | null;
    _sum: BookSumAggregateOutputType | null;
    _min: BookMinAggregateOutputType | null;
    _max: BookMaxAggregateOutputType | null;
};
export type BookAvgAggregateOutputType = {
    publishedYear: number | null;
    totalCopies: number | null;
    availableCopies: number | null;
};
export type BookSumAggregateOutputType = {
    publishedYear: number | null;
    totalCopies: number | null;
    availableCopies: number | null;
};
export type BookMinAggregateOutputType = {
    id: string | null;
    isbn: string | null;
    title: string | null;
    publishedYear: number | null;
    totalCopies: number | null;
    availableCopies: number | null;
    categoryId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BookMaxAggregateOutputType = {
    id: string | null;
    isbn: string | null;
    title: string | null;
    publishedYear: number | null;
    totalCopies: number | null;
    availableCopies: number | null;
    categoryId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BookCountAggregateOutputType = {
    id: number;
    isbn: number;
    title: number;
    publishedYear: number;
    totalCopies: number;
    availableCopies: number;
    categoryId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BookAvgAggregateInputType = {
    publishedYear?: true;
    totalCopies?: true;
    availableCopies?: true;
};
export type BookSumAggregateInputType = {
    publishedYear?: true;
    totalCopies?: true;
    availableCopies?: true;
};
export type BookMinAggregateInputType = {
    id?: true;
    isbn?: true;
    title?: true;
    publishedYear?: true;
    totalCopies?: true;
    availableCopies?: true;
    categoryId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BookMaxAggregateInputType = {
    id?: true;
    isbn?: true;
    title?: true;
    publishedYear?: true;
    totalCopies?: true;
    availableCopies?: true;
    categoryId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BookCountAggregateInputType = {
    id?: true;
    isbn?: true;
    title?: true;
    publishedYear?: true;
    totalCopies?: true;
    availableCopies?: true;
    categoryId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BookAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput | Prisma.BookOrderByWithRelationInput[];
    cursor?: Prisma.BookWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BookCountAggregateInputType;
    _avg?: BookAvgAggregateInputType;
    _sum?: BookSumAggregateInputType;
    _min?: BookMinAggregateInputType;
    _max?: BookMaxAggregateInputType;
};
export type GetBookAggregateType<T extends BookAggregateArgs> = {
    [P in keyof T & keyof AggregateBook]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBook[P]> : Prisma.GetScalarType<T[P], AggregateBook[P]>;
};
export type BookGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithAggregationInput | Prisma.BookOrderByWithAggregationInput[];
    by: Prisma.BookScalarFieldEnum[] | Prisma.BookScalarFieldEnum;
    having?: Prisma.BookScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BookCountAggregateInputType | true;
    _avg?: BookAvgAggregateInputType;
    _sum?: BookSumAggregateInputType;
    _min?: BookMinAggregateInputType;
    _max?: BookMaxAggregateInputType;
};
export type BookGroupByOutputType = {
    id: string;
    isbn: string;
    title: string;
    publishedYear: number | null;
    totalCopies: number;
    availableCopies: number;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: BookCountAggregateOutputType | null;
    _avg: BookAvgAggregateOutputType | null;
    _sum: BookSumAggregateOutputType | null;
    _min: BookMinAggregateOutputType | null;
    _max: BookMaxAggregateOutputType | null;
};
export type GetBookGroupByPayload<T extends BookGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BookGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BookGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BookGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BookGroupByOutputType[P]>;
}>>;
export type BookWhereInput = {
    AND?: Prisma.BookWhereInput | Prisma.BookWhereInput[];
    OR?: Prisma.BookWhereInput[];
    NOT?: Prisma.BookWhereInput | Prisma.BookWhereInput[];
    id?: Prisma.UuidFilter<"Book"> | string;
    isbn?: Prisma.StringFilter<"Book"> | string;
    title?: Prisma.StringFilter<"Book"> | string;
    publishedYear?: Prisma.IntNullableFilter<"Book"> | number | null;
    totalCopies?: Prisma.IntFilter<"Book"> | number;
    availableCopies?: Prisma.IntFilter<"Book"> | number;
    categoryId?: Prisma.UuidFilter<"Book"> | string;
    createdAt?: Prisma.DateTimeFilter<"Book"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Book"> | Date | string;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    authors?: Prisma.AuthorListRelationFilter;
    loans?: Prisma.LoanListRelationFilter;
};
export type BookOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    isbn?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    publishedYear?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalCopies?: Prisma.SortOrder;
    availableCopies?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    category?: Prisma.CategoryOrderByWithRelationInput;
    authors?: Prisma.AuthorOrderByRelationAggregateInput;
    loans?: Prisma.LoanOrderByRelationAggregateInput;
};
export type BookWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    isbn?: string;
    AND?: Prisma.BookWhereInput | Prisma.BookWhereInput[];
    OR?: Prisma.BookWhereInput[];
    NOT?: Prisma.BookWhereInput | Prisma.BookWhereInput[];
    title?: Prisma.StringFilter<"Book"> | string;
    publishedYear?: Prisma.IntNullableFilter<"Book"> | number | null;
    totalCopies?: Prisma.IntFilter<"Book"> | number;
    availableCopies?: Prisma.IntFilter<"Book"> | number;
    categoryId?: Prisma.UuidFilter<"Book"> | string;
    createdAt?: Prisma.DateTimeFilter<"Book"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Book"> | Date | string;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    authors?: Prisma.AuthorListRelationFilter;
    loans?: Prisma.LoanListRelationFilter;
}, "id" | "isbn">;
export type BookOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    isbn?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    publishedYear?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalCopies?: Prisma.SortOrder;
    availableCopies?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BookCountOrderByAggregateInput;
    _avg?: Prisma.BookAvgOrderByAggregateInput;
    _max?: Prisma.BookMaxOrderByAggregateInput;
    _min?: Prisma.BookMinOrderByAggregateInput;
    _sum?: Prisma.BookSumOrderByAggregateInput;
};
export type BookScalarWhereWithAggregatesInput = {
    AND?: Prisma.BookScalarWhereWithAggregatesInput | Prisma.BookScalarWhereWithAggregatesInput[];
    OR?: Prisma.BookScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BookScalarWhereWithAggregatesInput | Prisma.BookScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Book"> | string;
    isbn?: Prisma.StringWithAggregatesFilter<"Book"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Book"> | string;
    publishedYear?: Prisma.IntNullableWithAggregatesFilter<"Book"> | number | null;
    totalCopies?: Prisma.IntWithAggregatesFilter<"Book"> | number;
    availableCopies?: Prisma.IntWithAggregatesFilter<"Book"> | number;
    categoryId?: Prisma.UuidWithAggregatesFilter<"Book"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Book"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Book"> | Date | string;
};
export type BookCreateInput = {
    id?: string;
    isbn: string;
    title: string;
    publishedYear?: number | null;
    totalCopies?: number;
    availableCopies?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutBooksInput;
    authors?: Prisma.AuthorCreateNestedManyWithoutBooksInput;
    loans?: Prisma.LoanCreateNestedManyWithoutBookInput;
};
export type BookUncheckedCreateInput = {
    id?: string;
    isbn: string;
    title: string;
    publishedYear?: number | null;
    totalCopies?: number;
    availableCopies?: number;
    categoryId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authors?: Prisma.AuthorUncheckedCreateNestedManyWithoutBooksInput;
    loans?: Prisma.LoanUncheckedCreateNestedManyWithoutBookInput;
};
export type BookUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isbn?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    totalCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    availableCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutBooksNestedInput;
    authors?: Prisma.AuthorUpdateManyWithoutBooksNestedInput;
    loans?: Prisma.LoanUpdateManyWithoutBookNestedInput;
};
export type BookUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isbn?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    totalCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    availableCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    authors?: Prisma.AuthorUncheckedUpdateManyWithoutBooksNestedInput;
    loans?: Prisma.LoanUncheckedUpdateManyWithoutBookNestedInput;
};
export type BookCreateManyInput = {
    id?: string;
    isbn: string;
    title: string;
    publishedYear?: number | null;
    totalCopies?: number;
    availableCopies?: number;
    categoryId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BookUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isbn?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    totalCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    availableCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isbn?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    totalCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    availableCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookListRelationFilter = {
    every?: Prisma.BookWhereInput;
    some?: Prisma.BookWhereInput;
    none?: Prisma.BookWhereInput;
};
export type BookOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BookCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    isbn?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    publishedYear?: Prisma.SortOrder;
    totalCopies?: Prisma.SortOrder;
    availableCopies?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BookAvgOrderByAggregateInput = {
    publishedYear?: Prisma.SortOrder;
    totalCopies?: Prisma.SortOrder;
    availableCopies?: Prisma.SortOrder;
};
export type BookMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    isbn?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    publishedYear?: Prisma.SortOrder;
    totalCopies?: Prisma.SortOrder;
    availableCopies?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BookMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    isbn?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    publishedYear?: Prisma.SortOrder;
    totalCopies?: Prisma.SortOrder;
    availableCopies?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BookSumOrderByAggregateInput = {
    publishedYear?: Prisma.SortOrder;
    totalCopies?: Prisma.SortOrder;
    availableCopies?: Prisma.SortOrder;
};
export type BookScalarRelationFilter = {
    is?: Prisma.BookWhereInput;
    isNot?: Prisma.BookWhereInput;
};
export type BookCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.BookCreateWithoutCategoryInput, Prisma.BookUncheckedCreateWithoutCategoryInput> | Prisma.BookCreateWithoutCategoryInput[] | Prisma.BookUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.BookCreateOrConnectWithoutCategoryInput | Prisma.BookCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.BookCreateManyCategoryInputEnvelope;
    connect?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
};
export type BookUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.BookCreateWithoutCategoryInput, Prisma.BookUncheckedCreateWithoutCategoryInput> | Prisma.BookCreateWithoutCategoryInput[] | Prisma.BookUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.BookCreateOrConnectWithoutCategoryInput | Prisma.BookCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.BookCreateManyCategoryInputEnvelope;
    connect?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
};
export type BookUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.BookCreateWithoutCategoryInput, Prisma.BookUncheckedCreateWithoutCategoryInput> | Prisma.BookCreateWithoutCategoryInput[] | Prisma.BookUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.BookCreateOrConnectWithoutCategoryInput | Prisma.BookCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.BookUpsertWithWhereUniqueWithoutCategoryInput | Prisma.BookUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.BookCreateManyCategoryInputEnvelope;
    set?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
    disconnect?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
    delete?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
    connect?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
    update?: Prisma.BookUpdateWithWhereUniqueWithoutCategoryInput | Prisma.BookUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.BookUpdateManyWithWhereWithoutCategoryInput | Prisma.BookUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.BookScalarWhereInput | Prisma.BookScalarWhereInput[];
};
export type BookUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.BookCreateWithoutCategoryInput, Prisma.BookUncheckedCreateWithoutCategoryInput> | Prisma.BookCreateWithoutCategoryInput[] | Prisma.BookUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.BookCreateOrConnectWithoutCategoryInput | Prisma.BookCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.BookUpsertWithWhereUniqueWithoutCategoryInput | Prisma.BookUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.BookCreateManyCategoryInputEnvelope;
    set?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
    disconnect?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
    delete?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
    connect?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
    update?: Prisma.BookUpdateWithWhereUniqueWithoutCategoryInput | Prisma.BookUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.BookUpdateManyWithWhereWithoutCategoryInput | Prisma.BookUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.BookScalarWhereInput | Prisma.BookScalarWhereInput[];
};
export type BookCreateNestedManyWithoutAuthorsInput = {
    create?: Prisma.XOR<Prisma.BookCreateWithoutAuthorsInput, Prisma.BookUncheckedCreateWithoutAuthorsInput> | Prisma.BookCreateWithoutAuthorsInput[] | Prisma.BookUncheckedCreateWithoutAuthorsInput[];
    connectOrCreate?: Prisma.BookCreateOrConnectWithoutAuthorsInput | Prisma.BookCreateOrConnectWithoutAuthorsInput[];
    connect?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
};
export type BookUncheckedCreateNestedManyWithoutAuthorsInput = {
    create?: Prisma.XOR<Prisma.BookCreateWithoutAuthorsInput, Prisma.BookUncheckedCreateWithoutAuthorsInput> | Prisma.BookCreateWithoutAuthorsInput[] | Prisma.BookUncheckedCreateWithoutAuthorsInput[];
    connectOrCreate?: Prisma.BookCreateOrConnectWithoutAuthorsInput | Prisma.BookCreateOrConnectWithoutAuthorsInput[];
    connect?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
};
export type BookUpdateManyWithoutAuthorsNestedInput = {
    create?: Prisma.XOR<Prisma.BookCreateWithoutAuthorsInput, Prisma.BookUncheckedCreateWithoutAuthorsInput> | Prisma.BookCreateWithoutAuthorsInput[] | Prisma.BookUncheckedCreateWithoutAuthorsInput[];
    connectOrCreate?: Prisma.BookCreateOrConnectWithoutAuthorsInput | Prisma.BookCreateOrConnectWithoutAuthorsInput[];
    upsert?: Prisma.BookUpsertWithWhereUniqueWithoutAuthorsInput | Prisma.BookUpsertWithWhereUniqueWithoutAuthorsInput[];
    set?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
    disconnect?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
    delete?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
    connect?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
    update?: Prisma.BookUpdateWithWhereUniqueWithoutAuthorsInput | Prisma.BookUpdateWithWhereUniqueWithoutAuthorsInput[];
    updateMany?: Prisma.BookUpdateManyWithWhereWithoutAuthorsInput | Prisma.BookUpdateManyWithWhereWithoutAuthorsInput[];
    deleteMany?: Prisma.BookScalarWhereInput | Prisma.BookScalarWhereInput[];
};
export type BookUncheckedUpdateManyWithoutAuthorsNestedInput = {
    create?: Prisma.XOR<Prisma.BookCreateWithoutAuthorsInput, Prisma.BookUncheckedCreateWithoutAuthorsInput> | Prisma.BookCreateWithoutAuthorsInput[] | Prisma.BookUncheckedCreateWithoutAuthorsInput[];
    connectOrCreate?: Prisma.BookCreateOrConnectWithoutAuthorsInput | Prisma.BookCreateOrConnectWithoutAuthorsInput[];
    upsert?: Prisma.BookUpsertWithWhereUniqueWithoutAuthorsInput | Prisma.BookUpsertWithWhereUniqueWithoutAuthorsInput[];
    set?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
    disconnect?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
    delete?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
    connect?: Prisma.BookWhereUniqueInput | Prisma.BookWhereUniqueInput[];
    update?: Prisma.BookUpdateWithWhereUniqueWithoutAuthorsInput | Prisma.BookUpdateWithWhereUniqueWithoutAuthorsInput[];
    updateMany?: Prisma.BookUpdateManyWithWhereWithoutAuthorsInput | Prisma.BookUpdateManyWithWhereWithoutAuthorsInput[];
    deleteMany?: Prisma.BookScalarWhereInput | Prisma.BookScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type BookCreateNestedOneWithoutLoansInput = {
    create?: Prisma.XOR<Prisma.BookCreateWithoutLoansInput, Prisma.BookUncheckedCreateWithoutLoansInput>;
    connectOrCreate?: Prisma.BookCreateOrConnectWithoutLoansInput;
    connect?: Prisma.BookWhereUniqueInput;
};
export type BookUpdateOneRequiredWithoutLoansNestedInput = {
    create?: Prisma.XOR<Prisma.BookCreateWithoutLoansInput, Prisma.BookUncheckedCreateWithoutLoansInput>;
    connectOrCreate?: Prisma.BookCreateOrConnectWithoutLoansInput;
    upsert?: Prisma.BookUpsertWithoutLoansInput;
    connect?: Prisma.BookWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BookUpdateToOneWithWhereWithoutLoansInput, Prisma.BookUpdateWithoutLoansInput>, Prisma.BookUncheckedUpdateWithoutLoansInput>;
};
export type BookCreateWithoutCategoryInput = {
    id?: string;
    isbn: string;
    title: string;
    publishedYear?: number | null;
    totalCopies?: number;
    availableCopies?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authors?: Prisma.AuthorCreateNestedManyWithoutBooksInput;
    loans?: Prisma.LoanCreateNestedManyWithoutBookInput;
};
export type BookUncheckedCreateWithoutCategoryInput = {
    id?: string;
    isbn: string;
    title: string;
    publishedYear?: number | null;
    totalCopies?: number;
    availableCopies?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authors?: Prisma.AuthorUncheckedCreateNestedManyWithoutBooksInput;
    loans?: Prisma.LoanUncheckedCreateNestedManyWithoutBookInput;
};
export type BookCreateOrConnectWithoutCategoryInput = {
    where: Prisma.BookWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookCreateWithoutCategoryInput, Prisma.BookUncheckedCreateWithoutCategoryInput>;
};
export type BookCreateManyCategoryInputEnvelope = {
    data: Prisma.BookCreateManyCategoryInput | Prisma.BookCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type BookUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.BookWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookUpdateWithoutCategoryInput, Prisma.BookUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.BookCreateWithoutCategoryInput, Prisma.BookUncheckedCreateWithoutCategoryInput>;
};
export type BookUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.BookWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookUpdateWithoutCategoryInput, Prisma.BookUncheckedUpdateWithoutCategoryInput>;
};
export type BookUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.BookScalarWhereInput;
    data: Prisma.XOR<Prisma.BookUpdateManyMutationInput, Prisma.BookUncheckedUpdateManyWithoutCategoryInput>;
};
export type BookScalarWhereInput = {
    AND?: Prisma.BookScalarWhereInput | Prisma.BookScalarWhereInput[];
    OR?: Prisma.BookScalarWhereInput[];
    NOT?: Prisma.BookScalarWhereInput | Prisma.BookScalarWhereInput[];
    id?: Prisma.UuidFilter<"Book"> | string;
    isbn?: Prisma.StringFilter<"Book"> | string;
    title?: Prisma.StringFilter<"Book"> | string;
    publishedYear?: Prisma.IntNullableFilter<"Book"> | number | null;
    totalCopies?: Prisma.IntFilter<"Book"> | number;
    availableCopies?: Prisma.IntFilter<"Book"> | number;
    categoryId?: Prisma.UuidFilter<"Book"> | string;
    createdAt?: Prisma.DateTimeFilter<"Book"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Book"> | Date | string;
};
export type BookCreateWithoutAuthorsInput = {
    id?: string;
    isbn: string;
    title: string;
    publishedYear?: number | null;
    totalCopies?: number;
    availableCopies?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutBooksInput;
    loans?: Prisma.LoanCreateNestedManyWithoutBookInput;
};
export type BookUncheckedCreateWithoutAuthorsInput = {
    id?: string;
    isbn: string;
    title: string;
    publishedYear?: number | null;
    totalCopies?: number;
    availableCopies?: number;
    categoryId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    loans?: Prisma.LoanUncheckedCreateNestedManyWithoutBookInput;
};
export type BookCreateOrConnectWithoutAuthorsInput = {
    where: Prisma.BookWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookCreateWithoutAuthorsInput, Prisma.BookUncheckedCreateWithoutAuthorsInput>;
};
export type BookUpsertWithWhereUniqueWithoutAuthorsInput = {
    where: Prisma.BookWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookUpdateWithoutAuthorsInput, Prisma.BookUncheckedUpdateWithoutAuthorsInput>;
    create: Prisma.XOR<Prisma.BookCreateWithoutAuthorsInput, Prisma.BookUncheckedCreateWithoutAuthorsInput>;
};
export type BookUpdateWithWhereUniqueWithoutAuthorsInput = {
    where: Prisma.BookWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookUpdateWithoutAuthorsInput, Prisma.BookUncheckedUpdateWithoutAuthorsInput>;
};
export type BookUpdateManyWithWhereWithoutAuthorsInput = {
    where: Prisma.BookScalarWhereInput;
    data: Prisma.XOR<Prisma.BookUpdateManyMutationInput, Prisma.BookUncheckedUpdateManyWithoutAuthorsInput>;
};
export type BookCreateWithoutLoansInput = {
    id?: string;
    isbn: string;
    title: string;
    publishedYear?: number | null;
    totalCopies?: number;
    availableCopies?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutBooksInput;
    authors?: Prisma.AuthorCreateNestedManyWithoutBooksInput;
};
export type BookUncheckedCreateWithoutLoansInput = {
    id?: string;
    isbn: string;
    title: string;
    publishedYear?: number | null;
    totalCopies?: number;
    availableCopies?: number;
    categoryId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authors?: Prisma.AuthorUncheckedCreateNestedManyWithoutBooksInput;
};
export type BookCreateOrConnectWithoutLoansInput = {
    where: Prisma.BookWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookCreateWithoutLoansInput, Prisma.BookUncheckedCreateWithoutLoansInput>;
};
export type BookUpsertWithoutLoansInput = {
    update: Prisma.XOR<Prisma.BookUpdateWithoutLoansInput, Prisma.BookUncheckedUpdateWithoutLoansInput>;
    create: Prisma.XOR<Prisma.BookCreateWithoutLoansInput, Prisma.BookUncheckedCreateWithoutLoansInput>;
    where?: Prisma.BookWhereInput;
};
export type BookUpdateToOneWithWhereWithoutLoansInput = {
    where?: Prisma.BookWhereInput;
    data: Prisma.XOR<Prisma.BookUpdateWithoutLoansInput, Prisma.BookUncheckedUpdateWithoutLoansInput>;
};
export type BookUpdateWithoutLoansInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isbn?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    totalCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    availableCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutBooksNestedInput;
    authors?: Prisma.AuthorUpdateManyWithoutBooksNestedInput;
};
export type BookUncheckedUpdateWithoutLoansInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isbn?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    totalCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    availableCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    authors?: Prisma.AuthorUncheckedUpdateManyWithoutBooksNestedInput;
};
export type BookCreateManyCategoryInput = {
    id?: string;
    isbn: string;
    title: string;
    publishedYear?: number | null;
    totalCopies?: number;
    availableCopies?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BookUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isbn?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    totalCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    availableCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    authors?: Prisma.AuthorUpdateManyWithoutBooksNestedInput;
    loans?: Prisma.LoanUpdateManyWithoutBookNestedInput;
};
export type BookUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isbn?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    totalCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    availableCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    authors?: Prisma.AuthorUncheckedUpdateManyWithoutBooksNestedInput;
    loans?: Prisma.LoanUncheckedUpdateManyWithoutBookNestedInput;
};
export type BookUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isbn?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    totalCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    availableCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookUpdateWithoutAuthorsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isbn?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    totalCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    availableCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutBooksNestedInput;
    loans?: Prisma.LoanUpdateManyWithoutBookNestedInput;
};
export type BookUncheckedUpdateWithoutAuthorsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isbn?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    totalCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    availableCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loans?: Prisma.LoanUncheckedUpdateManyWithoutBookNestedInput;
};
export type BookUncheckedUpdateManyWithoutAuthorsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isbn?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedYear?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    totalCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    availableCopies?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BookCountOutputType = {
    authors: number;
    loans: number;
};
export type BookCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    authors?: boolean | BookCountOutputTypeCountAuthorsArgs;
    loans?: boolean | BookCountOutputTypeCountLoansArgs;
};
export type BookCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookCountOutputTypeSelect<ExtArgs> | null;
};
export type BookCountOutputTypeCountAuthorsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuthorWhereInput;
};
export type BookCountOutputTypeCountLoansArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoanWhereInput;
};
export type BookSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    isbn?: boolean;
    title?: boolean;
    publishedYear?: boolean;
    totalCopies?: boolean;
    availableCopies?: boolean;
    categoryId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    authors?: boolean | Prisma.Book$authorsArgs<ExtArgs>;
    loans?: boolean | Prisma.Book$loansArgs<ExtArgs>;
    _count?: boolean | Prisma.BookCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["book"]>;
export type BookSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    isbn?: boolean;
    title?: boolean;
    publishedYear?: boolean;
    totalCopies?: boolean;
    availableCopies?: boolean;
    categoryId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["book"]>;
export type BookSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    isbn?: boolean;
    title?: boolean;
    publishedYear?: boolean;
    totalCopies?: boolean;
    availableCopies?: boolean;
    categoryId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["book"]>;
export type BookSelectScalar = {
    id?: boolean;
    isbn?: boolean;
    title?: boolean;
    publishedYear?: boolean;
    totalCopies?: boolean;
    availableCopies?: boolean;
    categoryId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BookOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "isbn" | "title" | "publishedYear" | "totalCopies" | "availableCopies" | "categoryId" | "createdAt" | "updatedAt", ExtArgs["result"]["book"]>;
export type BookInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    authors?: boolean | Prisma.Book$authorsArgs<ExtArgs>;
    loans?: boolean | Prisma.Book$loansArgs<ExtArgs>;
    _count?: boolean | Prisma.BookCountOutputTypeDefaultArgs<ExtArgs>;
};
export type BookIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type BookIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type $BookPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Book";
    objects: {
        category: Prisma.$CategoryPayload<ExtArgs>;
        authors: Prisma.$AuthorPayload<ExtArgs>[];
        loans: Prisma.$LoanPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        isbn: string;
        title: string;
        publishedYear: number | null;
        totalCopies: number;
        availableCopies: number;
        categoryId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["book"]>;
    composites: {};
};
export type BookGetPayload<S extends boolean | null | undefined | BookDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BookPayload, S>;
export type BookCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BookFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BookCountAggregateInputType | true;
};
export interface BookDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Book'];
        meta: {
            name: 'Book';
        };
    };
    findUnique<T extends BookFindUniqueArgs>(args: Prisma.SelectSubset<T, BookFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BookClient<runtime.Types.Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BookFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BookFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BookClient<runtime.Types.Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BookFindFirstArgs>(args?: Prisma.SelectSubset<T, BookFindFirstArgs<ExtArgs>>): Prisma.Prisma__BookClient<runtime.Types.Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BookFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BookFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BookClient<runtime.Types.Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BookFindManyArgs>(args?: Prisma.SelectSubset<T, BookFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BookCreateArgs>(args: Prisma.SelectSubset<T, BookCreateArgs<ExtArgs>>): Prisma.Prisma__BookClient<runtime.Types.Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BookCreateManyArgs>(args?: Prisma.SelectSubset<T, BookCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BookCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BookCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BookDeleteArgs>(args: Prisma.SelectSubset<T, BookDeleteArgs<ExtArgs>>): Prisma.Prisma__BookClient<runtime.Types.Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BookUpdateArgs>(args: Prisma.SelectSubset<T, BookUpdateArgs<ExtArgs>>): Prisma.Prisma__BookClient<runtime.Types.Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BookDeleteManyArgs>(args?: Prisma.SelectSubset<T, BookDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BookUpdateManyArgs>(args: Prisma.SelectSubset<T, BookUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BookUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BookUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BookUpsertArgs>(args: Prisma.SelectSubset<T, BookUpsertArgs<ExtArgs>>): Prisma.Prisma__BookClient<runtime.Types.Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BookCountArgs>(args?: Prisma.Subset<T, BookCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BookCountAggregateOutputType> : number>;
    aggregate<T extends BookAggregateArgs>(args: Prisma.Subset<T, BookAggregateArgs>): Prisma.PrismaPromise<GetBookAggregateType<T>>;
    groupBy<T extends BookGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BookGroupByArgs['orderBy'];
    } : {
        orderBy?: BookGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BookGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BookFieldRefs;
}
export interface Prisma__BookClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    category<T extends Prisma.CategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    authors<T extends Prisma.Book$authorsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Book$authorsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    loans<T extends Prisma.Book$loansArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Book$loansArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BookFieldRefs {
    readonly id: Prisma.FieldRef<"Book", 'String'>;
    readonly isbn: Prisma.FieldRef<"Book", 'String'>;
    readonly title: Prisma.FieldRef<"Book", 'String'>;
    readonly publishedYear: Prisma.FieldRef<"Book", 'Int'>;
    readonly totalCopies: Prisma.FieldRef<"Book", 'Int'>;
    readonly availableCopies: Prisma.FieldRef<"Book", 'Int'>;
    readonly categoryId: Prisma.FieldRef<"Book", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Book", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Book", 'DateTime'>;
}
export type BookFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookSelect<ExtArgs> | null;
    omit?: Prisma.BookOmit<ExtArgs> | null;
    include?: Prisma.BookInclude<ExtArgs> | null;
    where: Prisma.BookWhereUniqueInput;
};
export type BookFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookSelect<ExtArgs> | null;
    omit?: Prisma.BookOmit<ExtArgs> | null;
    include?: Prisma.BookInclude<ExtArgs> | null;
    where: Prisma.BookWhereUniqueInput;
};
export type BookFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookSelect<ExtArgs> | null;
    omit?: Prisma.BookOmit<ExtArgs> | null;
    include?: Prisma.BookInclude<ExtArgs> | null;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput | Prisma.BookOrderByWithRelationInput[];
    cursor?: Prisma.BookWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookScalarFieldEnum | Prisma.BookScalarFieldEnum[];
};
export type BookFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookSelect<ExtArgs> | null;
    omit?: Prisma.BookOmit<ExtArgs> | null;
    include?: Prisma.BookInclude<ExtArgs> | null;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput | Prisma.BookOrderByWithRelationInput[];
    cursor?: Prisma.BookWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookScalarFieldEnum | Prisma.BookScalarFieldEnum[];
};
export type BookFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookSelect<ExtArgs> | null;
    omit?: Prisma.BookOmit<ExtArgs> | null;
    include?: Prisma.BookInclude<ExtArgs> | null;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput | Prisma.BookOrderByWithRelationInput[];
    cursor?: Prisma.BookWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookScalarFieldEnum | Prisma.BookScalarFieldEnum[];
};
export type BookCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookSelect<ExtArgs> | null;
    omit?: Prisma.BookOmit<ExtArgs> | null;
    include?: Prisma.BookInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookCreateInput, Prisma.BookUncheckedCreateInput>;
};
export type BookCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BookCreateManyInput | Prisma.BookCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BookCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BookOmit<ExtArgs> | null;
    data: Prisma.BookCreateManyInput | Prisma.BookCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BookIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BookUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookSelect<ExtArgs> | null;
    omit?: Prisma.BookOmit<ExtArgs> | null;
    include?: Prisma.BookInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookUpdateInput, Prisma.BookUncheckedUpdateInput>;
    where: Prisma.BookWhereUniqueInput;
};
export type BookUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BookUpdateManyMutationInput, Prisma.BookUncheckedUpdateManyInput>;
    where?: Prisma.BookWhereInput;
    limit?: number;
};
export type BookUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BookOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookUpdateManyMutationInput, Prisma.BookUncheckedUpdateManyInput>;
    where?: Prisma.BookWhereInput;
    limit?: number;
    include?: Prisma.BookIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BookUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookSelect<ExtArgs> | null;
    omit?: Prisma.BookOmit<ExtArgs> | null;
    include?: Prisma.BookInclude<ExtArgs> | null;
    where: Prisma.BookWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookCreateInput, Prisma.BookUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BookUpdateInput, Prisma.BookUncheckedUpdateInput>;
};
export type BookDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookSelect<ExtArgs> | null;
    omit?: Prisma.BookOmit<ExtArgs> | null;
    include?: Prisma.BookInclude<ExtArgs> | null;
    where: Prisma.BookWhereUniqueInput;
};
export type BookDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookWhereInput;
    limit?: number;
};
export type Book$authorsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthorSelect<ExtArgs> | null;
    omit?: Prisma.AuthorOmit<ExtArgs> | null;
    include?: Prisma.AuthorInclude<ExtArgs> | null;
    where?: Prisma.AuthorWhereInput;
    orderBy?: Prisma.AuthorOrderByWithRelationInput | Prisma.AuthorOrderByWithRelationInput[];
    cursor?: Prisma.AuthorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuthorScalarFieldEnum | Prisma.AuthorScalarFieldEnum[];
};
export type Book$loansArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoanSelect<ExtArgs> | null;
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    include?: Prisma.LoanInclude<ExtArgs> | null;
    where?: Prisma.LoanWhereInput;
    orderBy?: Prisma.LoanOrderByWithRelationInput | Prisma.LoanOrderByWithRelationInput[];
    cursor?: Prisma.LoanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LoanScalarFieldEnum | Prisma.LoanScalarFieldEnum[];
};
export type BookDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookSelect<ExtArgs> | null;
    omit?: Prisma.BookOmit<ExtArgs> | null;
    include?: Prisma.BookInclude<ExtArgs> | null;
};
