import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type LoanModel = runtime.Types.Result.DefaultSelection<Prisma.$LoanPayload>;
export type AggregateLoan = {
    _count: LoanCountAggregateOutputType | null;
    _avg: LoanAvgAggregateOutputType | null;
    _sum: LoanSumAggregateOutputType | null;
    _min: LoanMinAggregateOutputType | null;
    _max: LoanMaxAggregateOutputType | null;
};
export type LoanAvgAggregateOutputType = {
    lateFee: runtime.Decimal | null;
};
export type LoanSumAggregateOutputType = {
    lateFee: runtime.Decimal | null;
};
export type LoanMinAggregateOutputType = {
    id: string | null;
    bookId: string | null;
    memberId: string | null;
    borrowedAt: Date | null;
    dueAt: Date | null;
    returnedAt: Date | null;
    lateFee: runtime.Decimal | null;
};
export type LoanMaxAggregateOutputType = {
    id: string | null;
    bookId: string | null;
    memberId: string | null;
    borrowedAt: Date | null;
    dueAt: Date | null;
    returnedAt: Date | null;
    lateFee: runtime.Decimal | null;
};
export type LoanCountAggregateOutputType = {
    id: number;
    bookId: number;
    memberId: number;
    borrowedAt: number;
    dueAt: number;
    returnedAt: number;
    lateFee: number;
    _all: number;
};
export type LoanAvgAggregateInputType = {
    lateFee?: true;
};
export type LoanSumAggregateInputType = {
    lateFee?: true;
};
export type LoanMinAggregateInputType = {
    id?: true;
    bookId?: true;
    memberId?: true;
    borrowedAt?: true;
    dueAt?: true;
    returnedAt?: true;
    lateFee?: true;
};
export type LoanMaxAggregateInputType = {
    id?: true;
    bookId?: true;
    memberId?: true;
    borrowedAt?: true;
    dueAt?: true;
    returnedAt?: true;
    lateFee?: true;
};
export type LoanCountAggregateInputType = {
    id?: true;
    bookId?: true;
    memberId?: true;
    borrowedAt?: true;
    dueAt?: true;
    returnedAt?: true;
    lateFee?: true;
    _all?: true;
};
export type LoanAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoanWhereInput;
    orderBy?: Prisma.LoanOrderByWithRelationInput | Prisma.LoanOrderByWithRelationInput[];
    cursor?: Prisma.LoanWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LoanCountAggregateInputType;
    _avg?: LoanAvgAggregateInputType;
    _sum?: LoanSumAggregateInputType;
    _min?: LoanMinAggregateInputType;
    _max?: LoanMaxAggregateInputType;
};
export type GetLoanAggregateType<T extends LoanAggregateArgs> = {
    [P in keyof T & keyof AggregateLoan]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLoan[P]> : Prisma.GetScalarType<T[P], AggregateLoan[P]>;
};
export type LoanGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoanWhereInput;
    orderBy?: Prisma.LoanOrderByWithAggregationInput | Prisma.LoanOrderByWithAggregationInput[];
    by: Prisma.LoanScalarFieldEnum[] | Prisma.LoanScalarFieldEnum;
    having?: Prisma.LoanScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LoanCountAggregateInputType | true;
    _avg?: LoanAvgAggregateInputType;
    _sum?: LoanSumAggregateInputType;
    _min?: LoanMinAggregateInputType;
    _max?: LoanMaxAggregateInputType;
};
export type LoanGroupByOutputType = {
    id: string;
    bookId: string;
    memberId: string;
    borrowedAt: Date;
    dueAt: Date;
    returnedAt: Date | null;
    lateFee: runtime.Decimal;
    _count: LoanCountAggregateOutputType | null;
    _avg: LoanAvgAggregateOutputType | null;
    _sum: LoanSumAggregateOutputType | null;
    _min: LoanMinAggregateOutputType | null;
    _max: LoanMaxAggregateOutputType | null;
};
export type GetLoanGroupByPayload<T extends LoanGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LoanGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LoanGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LoanGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LoanGroupByOutputType[P]>;
}>>;
export type LoanWhereInput = {
    AND?: Prisma.LoanWhereInput | Prisma.LoanWhereInput[];
    OR?: Prisma.LoanWhereInput[];
    NOT?: Prisma.LoanWhereInput | Prisma.LoanWhereInput[];
    id?: Prisma.UuidFilter<"Loan"> | string;
    bookId?: Prisma.UuidFilter<"Loan"> | string;
    memberId?: Prisma.UuidFilter<"Loan"> | string;
    borrowedAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    dueAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    returnedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    lateFee?: Prisma.DecimalFilter<"Loan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    book?: Prisma.XOR<Prisma.BookScalarRelationFilter, Prisma.BookWhereInput>;
    member?: Prisma.XOR<Prisma.MemberScalarRelationFilter, Prisma.MemberWhereInput>;
};
export type LoanOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    bookId?: Prisma.SortOrder;
    memberId?: Prisma.SortOrder;
    borrowedAt?: Prisma.SortOrder;
    dueAt?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lateFee?: Prisma.SortOrder;
    book?: Prisma.BookOrderByWithRelationInput;
    member?: Prisma.MemberOrderByWithRelationInput;
};
export type LoanWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.LoanWhereInput | Prisma.LoanWhereInput[];
    OR?: Prisma.LoanWhereInput[];
    NOT?: Prisma.LoanWhereInput | Prisma.LoanWhereInput[];
    bookId?: Prisma.UuidFilter<"Loan"> | string;
    memberId?: Prisma.UuidFilter<"Loan"> | string;
    borrowedAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    dueAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    returnedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    lateFee?: Prisma.DecimalFilter<"Loan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    book?: Prisma.XOR<Prisma.BookScalarRelationFilter, Prisma.BookWhereInput>;
    member?: Prisma.XOR<Prisma.MemberScalarRelationFilter, Prisma.MemberWhereInput>;
}, "id">;
export type LoanOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    bookId?: Prisma.SortOrder;
    memberId?: Prisma.SortOrder;
    borrowedAt?: Prisma.SortOrder;
    dueAt?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lateFee?: Prisma.SortOrder;
    _count?: Prisma.LoanCountOrderByAggregateInput;
    _avg?: Prisma.LoanAvgOrderByAggregateInput;
    _max?: Prisma.LoanMaxOrderByAggregateInput;
    _min?: Prisma.LoanMinOrderByAggregateInput;
    _sum?: Prisma.LoanSumOrderByAggregateInput;
};
export type LoanScalarWhereWithAggregatesInput = {
    AND?: Prisma.LoanScalarWhereWithAggregatesInput | Prisma.LoanScalarWhereWithAggregatesInput[];
    OR?: Prisma.LoanScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LoanScalarWhereWithAggregatesInput | Prisma.LoanScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Loan"> | string;
    bookId?: Prisma.UuidWithAggregatesFilter<"Loan"> | string;
    memberId?: Prisma.UuidWithAggregatesFilter<"Loan"> | string;
    borrowedAt?: Prisma.DateTimeWithAggregatesFilter<"Loan"> | Date | string;
    dueAt?: Prisma.DateTimeWithAggregatesFilter<"Loan"> | Date | string;
    returnedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null;
    lateFee?: Prisma.DecimalWithAggregatesFilter<"Loan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LoanCreateInput = {
    id?: string;
    borrowedAt?: Date | string;
    dueAt: Date | string;
    returnedAt?: Date | string | null;
    lateFee?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    book: Prisma.BookCreateNestedOneWithoutLoansInput;
    member: Prisma.MemberCreateNestedOneWithoutLoansInput;
};
export type LoanUncheckedCreateInput = {
    id?: string;
    bookId: string;
    memberId: string;
    borrowedAt?: Date | string;
    dueAt: Date | string;
    returnedAt?: Date | string | null;
    lateFee?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LoanUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lateFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    book?: Prisma.BookUpdateOneRequiredWithoutLoansNestedInput;
    member?: Prisma.MemberUpdateOneRequiredWithoutLoansNestedInput;
};
export type LoanUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookId?: Prisma.StringFieldUpdateOperationsInput | string;
    memberId?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lateFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LoanCreateManyInput = {
    id?: string;
    bookId: string;
    memberId: string;
    borrowedAt?: Date | string;
    dueAt: Date | string;
    returnedAt?: Date | string | null;
    lateFee?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LoanUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lateFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LoanUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookId?: Prisma.StringFieldUpdateOperationsInput | string;
    memberId?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lateFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LoanListRelationFilter = {
    every?: Prisma.LoanWhereInput;
    some?: Prisma.LoanWhereInput;
    none?: Prisma.LoanWhereInput;
};
export type LoanOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LoanCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookId?: Prisma.SortOrder;
    memberId?: Prisma.SortOrder;
    borrowedAt?: Prisma.SortOrder;
    dueAt?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrder;
    lateFee?: Prisma.SortOrder;
};
export type LoanAvgOrderByAggregateInput = {
    lateFee?: Prisma.SortOrder;
};
export type LoanMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookId?: Prisma.SortOrder;
    memberId?: Prisma.SortOrder;
    borrowedAt?: Prisma.SortOrder;
    dueAt?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrder;
    lateFee?: Prisma.SortOrder;
};
export type LoanMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookId?: Prisma.SortOrder;
    memberId?: Prisma.SortOrder;
    borrowedAt?: Prisma.SortOrder;
    dueAt?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrder;
    lateFee?: Prisma.SortOrder;
};
export type LoanSumOrderByAggregateInput = {
    lateFee?: Prisma.SortOrder;
};
export type LoanCreateNestedManyWithoutBookInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutBookInput, Prisma.LoanUncheckedCreateWithoutBookInput> | Prisma.LoanCreateWithoutBookInput[] | Prisma.LoanUncheckedCreateWithoutBookInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutBookInput | Prisma.LoanCreateOrConnectWithoutBookInput[];
    createMany?: Prisma.LoanCreateManyBookInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUncheckedCreateNestedManyWithoutBookInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutBookInput, Prisma.LoanUncheckedCreateWithoutBookInput> | Prisma.LoanCreateWithoutBookInput[] | Prisma.LoanUncheckedCreateWithoutBookInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutBookInput | Prisma.LoanCreateOrConnectWithoutBookInput[];
    createMany?: Prisma.LoanCreateManyBookInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUpdateManyWithoutBookNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutBookInput, Prisma.LoanUncheckedCreateWithoutBookInput> | Prisma.LoanCreateWithoutBookInput[] | Prisma.LoanUncheckedCreateWithoutBookInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutBookInput | Prisma.LoanCreateOrConnectWithoutBookInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutBookInput | Prisma.LoanUpsertWithWhereUniqueWithoutBookInput[];
    createMany?: Prisma.LoanCreateManyBookInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutBookInput | Prisma.LoanUpdateWithWhereUniqueWithoutBookInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutBookInput | Prisma.LoanUpdateManyWithWhereWithoutBookInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUncheckedUpdateManyWithoutBookNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutBookInput, Prisma.LoanUncheckedCreateWithoutBookInput> | Prisma.LoanCreateWithoutBookInput[] | Prisma.LoanUncheckedCreateWithoutBookInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutBookInput | Prisma.LoanCreateOrConnectWithoutBookInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutBookInput | Prisma.LoanUpsertWithWhereUniqueWithoutBookInput[];
    createMany?: Prisma.LoanCreateManyBookInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutBookInput | Prisma.LoanUpdateWithWhereUniqueWithoutBookInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutBookInput | Prisma.LoanUpdateManyWithWhereWithoutBookInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanCreateNestedManyWithoutMemberInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutMemberInput, Prisma.LoanUncheckedCreateWithoutMemberInput> | Prisma.LoanCreateWithoutMemberInput[] | Prisma.LoanUncheckedCreateWithoutMemberInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutMemberInput | Prisma.LoanCreateOrConnectWithoutMemberInput[];
    createMany?: Prisma.LoanCreateManyMemberInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUncheckedCreateNestedManyWithoutMemberInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutMemberInput, Prisma.LoanUncheckedCreateWithoutMemberInput> | Prisma.LoanCreateWithoutMemberInput[] | Prisma.LoanUncheckedCreateWithoutMemberInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutMemberInput | Prisma.LoanCreateOrConnectWithoutMemberInput[];
    createMany?: Prisma.LoanCreateManyMemberInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUpdateManyWithoutMemberNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutMemberInput, Prisma.LoanUncheckedCreateWithoutMemberInput> | Prisma.LoanCreateWithoutMemberInput[] | Prisma.LoanUncheckedCreateWithoutMemberInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutMemberInput | Prisma.LoanCreateOrConnectWithoutMemberInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutMemberInput | Prisma.LoanUpsertWithWhereUniqueWithoutMemberInput[];
    createMany?: Prisma.LoanCreateManyMemberInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutMemberInput | Prisma.LoanUpdateWithWhereUniqueWithoutMemberInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutMemberInput | Prisma.LoanUpdateManyWithWhereWithoutMemberInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutMemberInput, Prisma.LoanUncheckedCreateWithoutMemberInput> | Prisma.LoanCreateWithoutMemberInput[] | Prisma.LoanUncheckedCreateWithoutMemberInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutMemberInput | Prisma.LoanCreateOrConnectWithoutMemberInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutMemberInput | Prisma.LoanUpsertWithWhereUniqueWithoutMemberInput[];
    createMany?: Prisma.LoanCreateManyMemberInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutMemberInput | Prisma.LoanUpdateWithWhereUniqueWithoutMemberInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutMemberInput | Prisma.LoanUpdateManyWithWhereWithoutMemberInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LoanCreateWithoutBookInput = {
    id?: string;
    borrowedAt?: Date | string;
    dueAt: Date | string;
    returnedAt?: Date | string | null;
    lateFee?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    member: Prisma.MemberCreateNestedOneWithoutLoansInput;
};
export type LoanUncheckedCreateWithoutBookInput = {
    id?: string;
    memberId: string;
    borrowedAt?: Date | string;
    dueAt: Date | string;
    returnedAt?: Date | string | null;
    lateFee?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LoanCreateOrConnectWithoutBookInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutBookInput, Prisma.LoanUncheckedCreateWithoutBookInput>;
};
export type LoanCreateManyBookInputEnvelope = {
    data: Prisma.LoanCreateManyBookInput | Prisma.LoanCreateManyBookInput[];
    skipDuplicates?: boolean;
};
export type LoanUpsertWithWhereUniqueWithoutBookInput = {
    where: Prisma.LoanWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoanUpdateWithoutBookInput, Prisma.LoanUncheckedUpdateWithoutBookInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutBookInput, Prisma.LoanUncheckedCreateWithoutBookInput>;
};
export type LoanUpdateWithWhereUniqueWithoutBookInput = {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutBookInput, Prisma.LoanUncheckedUpdateWithoutBookInput>;
};
export type LoanUpdateManyWithWhereWithoutBookInput = {
    where: Prisma.LoanScalarWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyWithoutBookInput>;
};
export type LoanScalarWhereInput = {
    AND?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
    OR?: Prisma.LoanScalarWhereInput[];
    NOT?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
    id?: Prisma.UuidFilter<"Loan"> | string;
    bookId?: Prisma.UuidFilter<"Loan"> | string;
    memberId?: Prisma.UuidFilter<"Loan"> | string;
    borrowedAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    dueAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    returnedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    lateFee?: Prisma.DecimalFilter<"Loan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LoanCreateWithoutMemberInput = {
    id?: string;
    borrowedAt?: Date | string;
    dueAt: Date | string;
    returnedAt?: Date | string | null;
    lateFee?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    book: Prisma.BookCreateNestedOneWithoutLoansInput;
};
export type LoanUncheckedCreateWithoutMemberInput = {
    id?: string;
    bookId: string;
    borrowedAt?: Date | string;
    dueAt: Date | string;
    returnedAt?: Date | string | null;
    lateFee?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LoanCreateOrConnectWithoutMemberInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutMemberInput, Prisma.LoanUncheckedCreateWithoutMemberInput>;
};
export type LoanCreateManyMemberInputEnvelope = {
    data: Prisma.LoanCreateManyMemberInput | Prisma.LoanCreateManyMemberInput[];
    skipDuplicates?: boolean;
};
export type LoanUpsertWithWhereUniqueWithoutMemberInput = {
    where: Prisma.LoanWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoanUpdateWithoutMemberInput, Prisma.LoanUncheckedUpdateWithoutMemberInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutMemberInput, Prisma.LoanUncheckedCreateWithoutMemberInput>;
};
export type LoanUpdateWithWhereUniqueWithoutMemberInput = {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutMemberInput, Prisma.LoanUncheckedUpdateWithoutMemberInput>;
};
export type LoanUpdateManyWithWhereWithoutMemberInput = {
    where: Prisma.LoanScalarWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyWithoutMemberInput>;
};
export type LoanCreateManyBookInput = {
    id?: string;
    memberId: string;
    borrowedAt?: Date | string;
    dueAt: Date | string;
    returnedAt?: Date | string | null;
    lateFee?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LoanUpdateWithoutBookInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lateFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    member?: Prisma.MemberUpdateOneRequiredWithoutLoansNestedInput;
};
export type LoanUncheckedUpdateWithoutBookInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    memberId?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lateFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LoanUncheckedUpdateManyWithoutBookInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    memberId?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lateFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LoanCreateManyMemberInput = {
    id?: string;
    bookId: string;
    borrowedAt?: Date | string;
    dueAt: Date | string;
    returnedAt?: Date | string | null;
    lateFee?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LoanUpdateWithoutMemberInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lateFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    book?: Prisma.BookUpdateOneRequiredWithoutLoansNestedInput;
};
export type LoanUncheckedUpdateWithoutMemberInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookId?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lateFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LoanUncheckedUpdateManyWithoutMemberInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookId?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lateFee?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LoanSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookId?: boolean;
    memberId?: boolean;
    borrowedAt?: boolean;
    dueAt?: boolean;
    returnedAt?: boolean;
    lateFee?: boolean;
    book?: boolean | Prisma.BookDefaultArgs<ExtArgs>;
    member?: boolean | Prisma.MemberDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["loan"]>;
export type LoanSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookId?: boolean;
    memberId?: boolean;
    borrowedAt?: boolean;
    dueAt?: boolean;
    returnedAt?: boolean;
    lateFee?: boolean;
    book?: boolean | Prisma.BookDefaultArgs<ExtArgs>;
    member?: boolean | Prisma.MemberDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["loan"]>;
export type LoanSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookId?: boolean;
    memberId?: boolean;
    borrowedAt?: boolean;
    dueAt?: boolean;
    returnedAt?: boolean;
    lateFee?: boolean;
    book?: boolean | Prisma.BookDefaultArgs<ExtArgs>;
    member?: boolean | Prisma.MemberDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["loan"]>;
export type LoanSelectScalar = {
    id?: boolean;
    bookId?: boolean;
    memberId?: boolean;
    borrowedAt?: boolean;
    dueAt?: boolean;
    returnedAt?: boolean;
    lateFee?: boolean;
};
export type LoanOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "bookId" | "memberId" | "borrowedAt" | "dueAt" | "returnedAt" | "lateFee", ExtArgs["result"]["loan"]>;
export type LoanInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    book?: boolean | Prisma.BookDefaultArgs<ExtArgs>;
    member?: boolean | Prisma.MemberDefaultArgs<ExtArgs>;
};
export type LoanIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    book?: boolean | Prisma.BookDefaultArgs<ExtArgs>;
    member?: boolean | Prisma.MemberDefaultArgs<ExtArgs>;
};
export type LoanIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    book?: boolean | Prisma.BookDefaultArgs<ExtArgs>;
    member?: boolean | Prisma.MemberDefaultArgs<ExtArgs>;
};
export type $LoanPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Loan";
    objects: {
        book: Prisma.$BookPayload<ExtArgs>;
        member: Prisma.$MemberPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        bookId: string;
        memberId: string;
        borrowedAt: Date;
        dueAt: Date;
        returnedAt: Date | null;
        lateFee: runtime.Decimal;
    }, ExtArgs["result"]["loan"]>;
    composites: {};
};
export type LoanGetPayload<S extends boolean | null | undefined | LoanDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LoanPayload, S>;
export type LoanCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LoanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LoanCountAggregateInputType | true;
};
export interface LoanDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Loan'];
        meta: {
            name: 'Loan';
        };
    };
    findUnique<T extends LoanFindUniqueArgs>(args: Prisma.SelectSubset<T, LoanFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LoanFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LoanFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LoanFindFirstArgs>(args?: Prisma.SelectSubset<T, LoanFindFirstArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LoanFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LoanFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LoanFindManyArgs>(args?: Prisma.SelectSubset<T, LoanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LoanCreateArgs>(args: Prisma.SelectSubset<T, LoanCreateArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LoanCreateManyArgs>(args?: Prisma.SelectSubset<T, LoanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LoanCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LoanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LoanDeleteArgs>(args: Prisma.SelectSubset<T, LoanDeleteArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LoanUpdateArgs>(args: Prisma.SelectSubset<T, LoanUpdateArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LoanDeleteManyArgs>(args?: Prisma.SelectSubset<T, LoanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LoanUpdateManyArgs>(args: Prisma.SelectSubset<T, LoanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LoanUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LoanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LoanUpsertArgs>(args: Prisma.SelectSubset<T, LoanUpsertArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LoanCountArgs>(args?: Prisma.Subset<T, LoanCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LoanCountAggregateOutputType> : number>;
    aggregate<T extends LoanAggregateArgs>(args: Prisma.Subset<T, LoanAggregateArgs>): Prisma.PrismaPromise<GetLoanAggregateType<T>>;
    groupBy<T extends LoanGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LoanGroupByArgs['orderBy'];
    } : {
        orderBy?: LoanGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LoanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LoanFieldRefs;
}
export interface Prisma__LoanClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    book<T extends Prisma.BookDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BookDefaultArgs<ExtArgs>>): Prisma.Prisma__BookClient<runtime.Types.Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    member<T extends Prisma.MemberDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MemberDefaultArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LoanFieldRefs {
    readonly id: Prisma.FieldRef<"Loan", 'String'>;
    readonly bookId: Prisma.FieldRef<"Loan", 'String'>;
    readonly memberId: Prisma.FieldRef<"Loan", 'String'>;
    readonly borrowedAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly dueAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly returnedAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly lateFee: Prisma.FieldRef<"Loan", 'Decimal'>;
}
export type LoanFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoanSelect<ExtArgs> | null;
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    include?: Prisma.LoanInclude<ExtArgs> | null;
    where: Prisma.LoanWhereUniqueInput;
};
export type LoanFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoanSelect<ExtArgs> | null;
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    include?: Prisma.LoanInclude<ExtArgs> | null;
    where: Prisma.LoanWhereUniqueInput;
};
export type LoanFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type LoanFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type LoanFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type LoanCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoanSelect<ExtArgs> | null;
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    include?: Prisma.LoanInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LoanCreateInput, Prisma.LoanUncheckedCreateInput>;
};
export type LoanCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LoanCreateManyInput | Prisma.LoanCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LoanCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoanSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    data: Prisma.LoanCreateManyInput | Prisma.LoanCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.LoanIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type LoanUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoanSelect<ExtArgs> | null;
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    include?: Prisma.LoanInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LoanUpdateInput, Prisma.LoanUncheckedUpdateInput>;
    where: Prisma.LoanWhereUniqueInput;
};
export type LoanUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyInput>;
    where?: Prisma.LoanWhereInput;
    limit?: number;
};
export type LoanUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoanSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyInput>;
    where?: Prisma.LoanWhereInput;
    limit?: number;
    include?: Prisma.LoanIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type LoanUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoanSelect<ExtArgs> | null;
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    include?: Prisma.LoanInclude<ExtArgs> | null;
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateInput, Prisma.LoanUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LoanUpdateInput, Prisma.LoanUncheckedUpdateInput>;
};
export type LoanDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoanSelect<ExtArgs> | null;
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    include?: Prisma.LoanInclude<ExtArgs> | null;
    where: Prisma.LoanWhereUniqueInput;
};
export type LoanDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoanWhereInput;
    limit?: number;
};
export type LoanDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LoanSelect<ExtArgs> | null;
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    include?: Prisma.LoanInclude<ExtArgs> | null;
};
