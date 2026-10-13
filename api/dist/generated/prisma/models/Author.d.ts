import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AuthorModel = runtime.Types.Result.DefaultSelection<Prisma.$AuthorPayload>;
export type AggregateAuthor = {
    _count: AuthorCountAggregateOutputType | null;
    _min: AuthorMinAggregateOutputType | null;
    _max: AuthorMaxAggregateOutputType | null;
};
export type AuthorMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    bio: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AuthorMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    bio: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AuthorCountAggregateOutputType = {
    id: number;
    name: number;
    bio: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AuthorMinAggregateInputType = {
    id?: true;
    name?: true;
    bio?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AuthorMaxAggregateInputType = {
    id?: true;
    name?: true;
    bio?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AuthorCountAggregateInputType = {
    id?: true;
    name?: true;
    bio?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AuthorAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuthorWhereInput;
    orderBy?: Prisma.AuthorOrderByWithRelationInput | Prisma.AuthorOrderByWithRelationInput[];
    cursor?: Prisma.AuthorWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AuthorCountAggregateInputType;
    _min?: AuthorMinAggregateInputType;
    _max?: AuthorMaxAggregateInputType;
};
export type GetAuthorAggregateType<T extends AuthorAggregateArgs> = {
    [P in keyof T & keyof AggregateAuthor]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAuthor[P]> : Prisma.GetScalarType<T[P], AggregateAuthor[P]>;
};
export type AuthorGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuthorWhereInput;
    orderBy?: Prisma.AuthorOrderByWithAggregationInput | Prisma.AuthorOrderByWithAggregationInput[];
    by: Prisma.AuthorScalarFieldEnum[] | Prisma.AuthorScalarFieldEnum;
    having?: Prisma.AuthorScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AuthorCountAggregateInputType | true;
    _min?: AuthorMinAggregateInputType;
    _max?: AuthorMaxAggregateInputType;
};
export type AuthorGroupByOutputType = {
    id: string;
    name: string;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: AuthorCountAggregateOutputType | null;
    _min: AuthorMinAggregateOutputType | null;
    _max: AuthorMaxAggregateOutputType | null;
};
export type GetAuthorGroupByPayload<T extends AuthorGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AuthorGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AuthorGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AuthorGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AuthorGroupByOutputType[P]>;
}>>;
export type AuthorWhereInput = {
    AND?: Prisma.AuthorWhereInput | Prisma.AuthorWhereInput[];
    OR?: Prisma.AuthorWhereInput[];
    NOT?: Prisma.AuthorWhereInput | Prisma.AuthorWhereInput[];
    id?: Prisma.UuidFilter<"Author"> | string;
    name?: Prisma.StringFilter<"Author"> | string;
    bio?: Prisma.StringNullableFilter<"Author"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Author"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Author"> | Date | string;
    books?: Prisma.BookListRelationFilter;
};
export type AuthorOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    bio?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    books?: Prisma.BookOrderByRelationAggregateInput;
};
export type AuthorWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AuthorWhereInput | Prisma.AuthorWhereInput[];
    OR?: Prisma.AuthorWhereInput[];
    NOT?: Prisma.AuthorWhereInput | Prisma.AuthorWhereInput[];
    name?: Prisma.StringFilter<"Author"> | string;
    bio?: Prisma.StringNullableFilter<"Author"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Author"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Author"> | Date | string;
    books?: Prisma.BookListRelationFilter;
}, "id">;
export type AuthorOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    bio?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AuthorCountOrderByAggregateInput;
    _max?: Prisma.AuthorMaxOrderByAggregateInput;
    _min?: Prisma.AuthorMinOrderByAggregateInput;
};
export type AuthorScalarWhereWithAggregatesInput = {
    AND?: Prisma.AuthorScalarWhereWithAggregatesInput | Prisma.AuthorScalarWhereWithAggregatesInput[];
    OR?: Prisma.AuthorScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AuthorScalarWhereWithAggregatesInput | Prisma.AuthorScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Author"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Author"> | string;
    bio?: Prisma.StringNullableWithAggregatesFilter<"Author"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Author"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Author"> | Date | string;
};
export type AuthorCreateInput = {
    id?: string;
    name: string;
    bio?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    books?: Prisma.BookCreateNestedManyWithoutAuthorsInput;
};
export type AuthorUncheckedCreateInput = {
    id?: string;
    name: string;
    bio?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    books?: Prisma.BookUncheckedCreateNestedManyWithoutAuthorsInput;
};
export type AuthorUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    books?: Prisma.BookUpdateManyWithoutAuthorsNestedInput;
};
export type AuthorUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    books?: Prisma.BookUncheckedUpdateManyWithoutAuthorsNestedInput;
};
export type AuthorCreateManyInput = {
    id?: string;
    name: string;
    bio?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AuthorUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthorUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthorCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AuthorMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AuthorMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AuthorListRelationFilter = {
    every?: Prisma.AuthorWhereInput;
    some?: Prisma.AuthorWhereInput;
    none?: Prisma.AuthorWhereInput;
};
export type AuthorOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type AuthorCreateNestedManyWithoutBooksInput = {
    create?: Prisma.XOR<Prisma.AuthorCreateWithoutBooksInput, Prisma.AuthorUncheckedCreateWithoutBooksInput> | Prisma.AuthorCreateWithoutBooksInput[] | Prisma.AuthorUncheckedCreateWithoutBooksInput[];
    connectOrCreate?: Prisma.AuthorCreateOrConnectWithoutBooksInput | Prisma.AuthorCreateOrConnectWithoutBooksInput[];
    connect?: Prisma.AuthorWhereUniqueInput | Prisma.AuthorWhereUniqueInput[];
};
export type AuthorUncheckedCreateNestedManyWithoutBooksInput = {
    create?: Prisma.XOR<Prisma.AuthorCreateWithoutBooksInput, Prisma.AuthorUncheckedCreateWithoutBooksInput> | Prisma.AuthorCreateWithoutBooksInput[] | Prisma.AuthorUncheckedCreateWithoutBooksInput[];
    connectOrCreate?: Prisma.AuthorCreateOrConnectWithoutBooksInput | Prisma.AuthorCreateOrConnectWithoutBooksInput[];
    connect?: Prisma.AuthorWhereUniqueInput | Prisma.AuthorWhereUniqueInput[];
};
export type AuthorUpdateManyWithoutBooksNestedInput = {
    create?: Prisma.XOR<Prisma.AuthorCreateWithoutBooksInput, Prisma.AuthorUncheckedCreateWithoutBooksInput> | Prisma.AuthorCreateWithoutBooksInput[] | Prisma.AuthorUncheckedCreateWithoutBooksInput[];
    connectOrCreate?: Prisma.AuthorCreateOrConnectWithoutBooksInput | Prisma.AuthorCreateOrConnectWithoutBooksInput[];
    upsert?: Prisma.AuthorUpsertWithWhereUniqueWithoutBooksInput | Prisma.AuthorUpsertWithWhereUniqueWithoutBooksInput[];
    set?: Prisma.AuthorWhereUniqueInput | Prisma.AuthorWhereUniqueInput[];
    disconnect?: Prisma.AuthorWhereUniqueInput | Prisma.AuthorWhereUniqueInput[];
    delete?: Prisma.AuthorWhereUniqueInput | Prisma.AuthorWhereUniqueInput[];
    connect?: Prisma.AuthorWhereUniqueInput | Prisma.AuthorWhereUniqueInput[];
    update?: Prisma.AuthorUpdateWithWhereUniqueWithoutBooksInput | Prisma.AuthorUpdateWithWhereUniqueWithoutBooksInput[];
    updateMany?: Prisma.AuthorUpdateManyWithWhereWithoutBooksInput | Prisma.AuthorUpdateManyWithWhereWithoutBooksInput[];
    deleteMany?: Prisma.AuthorScalarWhereInput | Prisma.AuthorScalarWhereInput[];
};
export type AuthorUncheckedUpdateManyWithoutBooksNestedInput = {
    create?: Prisma.XOR<Prisma.AuthorCreateWithoutBooksInput, Prisma.AuthorUncheckedCreateWithoutBooksInput> | Prisma.AuthorCreateWithoutBooksInput[] | Prisma.AuthorUncheckedCreateWithoutBooksInput[];
    connectOrCreate?: Prisma.AuthorCreateOrConnectWithoutBooksInput | Prisma.AuthorCreateOrConnectWithoutBooksInput[];
    upsert?: Prisma.AuthorUpsertWithWhereUniqueWithoutBooksInput | Prisma.AuthorUpsertWithWhereUniqueWithoutBooksInput[];
    set?: Prisma.AuthorWhereUniqueInput | Prisma.AuthorWhereUniqueInput[];
    disconnect?: Prisma.AuthorWhereUniqueInput | Prisma.AuthorWhereUniqueInput[];
    delete?: Prisma.AuthorWhereUniqueInput | Prisma.AuthorWhereUniqueInput[];
    connect?: Prisma.AuthorWhereUniqueInput | Prisma.AuthorWhereUniqueInput[];
    update?: Prisma.AuthorUpdateWithWhereUniqueWithoutBooksInput | Prisma.AuthorUpdateWithWhereUniqueWithoutBooksInput[];
    updateMany?: Prisma.AuthorUpdateManyWithWhereWithoutBooksInput | Prisma.AuthorUpdateManyWithWhereWithoutBooksInput[];
    deleteMany?: Prisma.AuthorScalarWhereInput | Prisma.AuthorScalarWhereInput[];
};
export type AuthorCreateWithoutBooksInput = {
    id?: string;
    name: string;
    bio?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AuthorUncheckedCreateWithoutBooksInput = {
    id?: string;
    name: string;
    bio?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AuthorCreateOrConnectWithoutBooksInput = {
    where: Prisma.AuthorWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuthorCreateWithoutBooksInput, Prisma.AuthorUncheckedCreateWithoutBooksInput>;
};
export type AuthorUpsertWithWhereUniqueWithoutBooksInput = {
    where: Prisma.AuthorWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuthorUpdateWithoutBooksInput, Prisma.AuthorUncheckedUpdateWithoutBooksInput>;
    create: Prisma.XOR<Prisma.AuthorCreateWithoutBooksInput, Prisma.AuthorUncheckedCreateWithoutBooksInput>;
};
export type AuthorUpdateWithWhereUniqueWithoutBooksInput = {
    where: Prisma.AuthorWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuthorUpdateWithoutBooksInput, Prisma.AuthorUncheckedUpdateWithoutBooksInput>;
};
export type AuthorUpdateManyWithWhereWithoutBooksInput = {
    where: Prisma.AuthorScalarWhereInput;
    data: Prisma.XOR<Prisma.AuthorUpdateManyMutationInput, Prisma.AuthorUncheckedUpdateManyWithoutBooksInput>;
};
export type AuthorScalarWhereInput = {
    AND?: Prisma.AuthorScalarWhereInput | Prisma.AuthorScalarWhereInput[];
    OR?: Prisma.AuthorScalarWhereInput[];
    NOT?: Prisma.AuthorScalarWhereInput | Prisma.AuthorScalarWhereInput[];
    id?: Prisma.UuidFilter<"Author"> | string;
    name?: Prisma.StringFilter<"Author"> | string;
    bio?: Prisma.StringNullableFilter<"Author"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Author"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Author"> | Date | string;
};
export type AuthorUpdateWithoutBooksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthorUncheckedUpdateWithoutBooksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthorUncheckedUpdateManyWithoutBooksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthorCountOutputType = {
    books: number;
};
export type AuthorCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    books?: boolean | AuthorCountOutputTypeCountBooksArgs;
};
export type AuthorCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthorCountOutputTypeSelect<ExtArgs> | null;
};
export type AuthorCountOutputTypeCountBooksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookWhereInput;
};
export type AuthorSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    bio?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    books?: boolean | Prisma.Author$booksArgs<ExtArgs>;
    _count?: boolean | Prisma.AuthorCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["author"]>;
export type AuthorSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    bio?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["author"]>;
export type AuthorSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    bio?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["author"]>;
export type AuthorSelectScalar = {
    id?: boolean;
    name?: boolean;
    bio?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AuthorOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "bio" | "createdAt" | "updatedAt", ExtArgs["result"]["author"]>;
export type AuthorInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    books?: boolean | Prisma.Author$booksArgs<ExtArgs>;
    _count?: boolean | Prisma.AuthorCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AuthorIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type AuthorIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $AuthorPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Author";
    objects: {
        books: Prisma.$BookPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["author"]>;
    composites: {};
};
export type AuthorGetPayload<S extends boolean | null | undefined | AuthorDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AuthorPayload, S>;
export type AuthorCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AuthorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AuthorCountAggregateInputType | true;
};
export interface AuthorDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Author'];
        meta: {
            name: 'Author';
        };
    };
    findUnique<T extends AuthorFindUniqueArgs>(args: Prisma.SelectSubset<T, AuthorFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AuthorClient<runtime.Types.Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AuthorFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AuthorFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuthorClient<runtime.Types.Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AuthorFindFirstArgs>(args?: Prisma.SelectSubset<T, AuthorFindFirstArgs<ExtArgs>>): Prisma.Prisma__AuthorClient<runtime.Types.Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AuthorFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AuthorFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuthorClient<runtime.Types.Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AuthorFindManyArgs>(args?: Prisma.SelectSubset<T, AuthorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AuthorCreateArgs>(args: Prisma.SelectSubset<T, AuthorCreateArgs<ExtArgs>>): Prisma.Prisma__AuthorClient<runtime.Types.Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AuthorCreateManyArgs>(args?: Prisma.SelectSubset<T, AuthorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AuthorCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AuthorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AuthorDeleteArgs>(args: Prisma.SelectSubset<T, AuthorDeleteArgs<ExtArgs>>): Prisma.Prisma__AuthorClient<runtime.Types.Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AuthorUpdateArgs>(args: Prisma.SelectSubset<T, AuthorUpdateArgs<ExtArgs>>): Prisma.Prisma__AuthorClient<runtime.Types.Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AuthorDeleteManyArgs>(args?: Prisma.SelectSubset<T, AuthorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AuthorUpdateManyArgs>(args: Prisma.SelectSubset<T, AuthorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AuthorUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AuthorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AuthorUpsertArgs>(args: Prisma.SelectSubset<T, AuthorUpsertArgs<ExtArgs>>): Prisma.Prisma__AuthorClient<runtime.Types.Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AuthorCountArgs>(args?: Prisma.Subset<T, AuthorCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AuthorCountAggregateOutputType> : number>;
    aggregate<T extends AuthorAggregateArgs>(args: Prisma.Subset<T, AuthorAggregateArgs>): Prisma.PrismaPromise<GetAuthorAggregateType<T>>;
    groupBy<T extends AuthorGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AuthorGroupByArgs['orderBy'];
    } : {
        orderBy?: AuthorGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AuthorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AuthorFieldRefs;
}
export interface Prisma__AuthorClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    books<T extends Prisma.Author$booksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Author$booksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AuthorFieldRefs {
    readonly id: Prisma.FieldRef<"Author", 'String'>;
    readonly name: Prisma.FieldRef<"Author", 'String'>;
    readonly bio: Prisma.FieldRef<"Author", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Author", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Author", 'DateTime'>;
}
export type AuthorFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthorSelect<ExtArgs> | null;
    omit?: Prisma.AuthorOmit<ExtArgs> | null;
    include?: Prisma.AuthorInclude<ExtArgs> | null;
    where: Prisma.AuthorWhereUniqueInput;
};
export type AuthorFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthorSelect<ExtArgs> | null;
    omit?: Prisma.AuthorOmit<ExtArgs> | null;
    include?: Prisma.AuthorInclude<ExtArgs> | null;
    where: Prisma.AuthorWhereUniqueInput;
};
export type AuthorFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AuthorFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AuthorFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AuthorCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthorSelect<ExtArgs> | null;
    omit?: Prisma.AuthorOmit<ExtArgs> | null;
    include?: Prisma.AuthorInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuthorCreateInput, Prisma.AuthorUncheckedCreateInput>;
};
export type AuthorCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AuthorCreateManyInput | Prisma.AuthorCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AuthorCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthorSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuthorOmit<ExtArgs> | null;
    data: Prisma.AuthorCreateManyInput | Prisma.AuthorCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AuthorUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthorSelect<ExtArgs> | null;
    omit?: Prisma.AuthorOmit<ExtArgs> | null;
    include?: Prisma.AuthorInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuthorUpdateInput, Prisma.AuthorUncheckedUpdateInput>;
    where: Prisma.AuthorWhereUniqueInput;
};
export type AuthorUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AuthorUpdateManyMutationInput, Prisma.AuthorUncheckedUpdateManyInput>;
    where?: Prisma.AuthorWhereInput;
    limit?: number;
};
export type AuthorUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthorSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuthorOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuthorUpdateManyMutationInput, Prisma.AuthorUncheckedUpdateManyInput>;
    where?: Prisma.AuthorWhereInput;
    limit?: number;
};
export type AuthorUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthorSelect<ExtArgs> | null;
    omit?: Prisma.AuthorOmit<ExtArgs> | null;
    include?: Prisma.AuthorInclude<ExtArgs> | null;
    where: Prisma.AuthorWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuthorCreateInput, Prisma.AuthorUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AuthorUpdateInput, Prisma.AuthorUncheckedUpdateInput>;
};
export type AuthorDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthorSelect<ExtArgs> | null;
    omit?: Prisma.AuthorOmit<ExtArgs> | null;
    include?: Prisma.AuthorInclude<ExtArgs> | null;
    where: Prisma.AuthorWhereUniqueInput;
};
export type AuthorDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuthorWhereInput;
    limit?: number;
};
export type Author$booksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AuthorDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthorSelect<ExtArgs> | null;
    omit?: Prisma.AuthorOmit<ExtArgs> | null;
    include?: Prisma.AuthorInclude<ExtArgs> | null;
};
