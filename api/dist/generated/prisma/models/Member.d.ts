import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MemberModel = runtime.Types.Result.DefaultSelection<Prisma.$MemberPayload>;
export type AggregateMember = {
    _count: MemberCountAggregateOutputType | null;
    _min: MemberMinAggregateOutputType | null;
    _max: MemberMaxAggregateOutputType | null;
};
export type MemberMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    status: $Enums.MemberStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MemberMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    status: $Enums.MemberStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MemberCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type MemberMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MemberMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MemberCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type MemberAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MemberWhereInput;
    orderBy?: Prisma.MemberOrderByWithRelationInput | Prisma.MemberOrderByWithRelationInput[];
    cursor?: Prisma.MemberWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MemberCountAggregateInputType;
    _min?: MemberMinAggregateInputType;
    _max?: MemberMaxAggregateInputType;
};
export type GetMemberAggregateType<T extends MemberAggregateArgs> = {
    [P in keyof T & keyof AggregateMember]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMember[P]> : Prisma.GetScalarType<T[P], AggregateMember[P]>;
};
export type MemberGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MemberWhereInput;
    orderBy?: Prisma.MemberOrderByWithAggregationInput | Prisma.MemberOrderByWithAggregationInput[];
    by: Prisma.MemberScalarFieldEnum[] | Prisma.MemberScalarFieldEnum;
    having?: Prisma.MemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MemberCountAggregateInputType | true;
    _min?: MemberMinAggregateInputType;
    _max?: MemberMaxAggregateInputType;
};
export type MemberGroupByOutputType = {
    id: string;
    name: string;
    email: string;
    status: $Enums.MemberStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: MemberCountAggregateOutputType | null;
    _min: MemberMinAggregateOutputType | null;
    _max: MemberMaxAggregateOutputType | null;
};
export type GetMemberGroupByPayload<T extends MemberGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MemberGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MemberGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MemberGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MemberGroupByOutputType[P]>;
}>>;
export type MemberWhereInput = {
    AND?: Prisma.MemberWhereInput | Prisma.MemberWhereInput[];
    OR?: Prisma.MemberWhereInput[];
    NOT?: Prisma.MemberWhereInput | Prisma.MemberWhereInput[];
    id?: Prisma.UuidFilter<"Member"> | string;
    name?: Prisma.StringFilter<"Member"> | string;
    email?: Prisma.StringFilter<"Member"> | string;
    status?: Prisma.EnumMemberStatusFilter<"Member"> | $Enums.MemberStatus;
    createdAt?: Prisma.DateTimeFilter<"Member"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Member"> | Date | string;
    loans?: Prisma.LoanListRelationFilter;
};
export type MemberOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    loans?: Prisma.LoanOrderByRelationAggregateInput;
};
export type MemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.MemberWhereInput | Prisma.MemberWhereInput[];
    OR?: Prisma.MemberWhereInput[];
    NOT?: Prisma.MemberWhereInput | Prisma.MemberWhereInput[];
    name?: Prisma.StringFilter<"Member"> | string;
    status?: Prisma.EnumMemberStatusFilter<"Member"> | $Enums.MemberStatus;
    createdAt?: Prisma.DateTimeFilter<"Member"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Member"> | Date | string;
    loans?: Prisma.LoanListRelationFilter;
}, "id" | "email">;
export type MemberOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.MemberCountOrderByAggregateInput;
    _max?: Prisma.MemberMaxOrderByAggregateInput;
    _min?: Prisma.MemberMinOrderByAggregateInput;
};
export type MemberScalarWhereWithAggregatesInput = {
    AND?: Prisma.MemberScalarWhereWithAggregatesInput | Prisma.MemberScalarWhereWithAggregatesInput[];
    OR?: Prisma.MemberScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MemberScalarWhereWithAggregatesInput | Prisma.MemberScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Member"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Member"> | string;
    email?: Prisma.StringWithAggregatesFilter<"Member"> | string;
    status?: Prisma.EnumMemberStatusWithAggregatesFilter<"Member"> | $Enums.MemberStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Member"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Member"> | Date | string;
};
export type MemberCreateInput = {
    id?: string;
    name: string;
    email: string;
    status?: $Enums.MemberStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    loans?: Prisma.LoanCreateNestedManyWithoutMemberInput;
};
export type MemberUncheckedCreateInput = {
    id?: string;
    name: string;
    email: string;
    status?: $Enums.MemberStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    loans?: Prisma.LoanUncheckedCreateNestedManyWithoutMemberInput;
};
export type MemberUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loans?: Prisma.LoanUpdateManyWithoutMemberNestedInput;
};
export type MemberUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loans?: Prisma.LoanUncheckedUpdateManyWithoutMemberNestedInput;
};
export type MemberCreateManyInput = {
    id?: string;
    name: string;
    email: string;
    status?: $Enums.MemberStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MemberUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MemberUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MemberCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MemberMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MemberMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MemberScalarRelationFilter = {
    is?: Prisma.MemberWhereInput;
    isNot?: Prisma.MemberWhereInput;
};
export type EnumMemberStatusFieldUpdateOperationsInput = {
    set?: $Enums.MemberStatus;
};
export type MemberCreateNestedOneWithoutLoansInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutLoansInput, Prisma.MemberUncheckedCreateWithoutLoansInput>;
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutLoansInput;
    connect?: Prisma.MemberWhereUniqueInput;
};
export type MemberUpdateOneRequiredWithoutLoansNestedInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutLoansInput, Prisma.MemberUncheckedCreateWithoutLoansInput>;
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutLoansInput;
    upsert?: Prisma.MemberUpsertWithoutLoansInput;
    connect?: Prisma.MemberWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MemberUpdateToOneWithWhereWithoutLoansInput, Prisma.MemberUpdateWithoutLoansInput>, Prisma.MemberUncheckedUpdateWithoutLoansInput>;
};
export type MemberCreateWithoutLoansInput = {
    id?: string;
    name: string;
    email: string;
    status?: $Enums.MemberStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MemberUncheckedCreateWithoutLoansInput = {
    id?: string;
    name: string;
    email: string;
    status?: $Enums.MemberStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MemberCreateOrConnectWithoutLoansInput = {
    where: Prisma.MemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.MemberCreateWithoutLoansInput, Prisma.MemberUncheckedCreateWithoutLoansInput>;
};
export type MemberUpsertWithoutLoansInput = {
    update: Prisma.XOR<Prisma.MemberUpdateWithoutLoansInput, Prisma.MemberUncheckedUpdateWithoutLoansInput>;
    create: Prisma.XOR<Prisma.MemberCreateWithoutLoansInput, Prisma.MemberUncheckedCreateWithoutLoansInput>;
    where?: Prisma.MemberWhereInput;
};
export type MemberUpdateToOneWithWhereWithoutLoansInput = {
    where?: Prisma.MemberWhereInput;
    data: Prisma.XOR<Prisma.MemberUpdateWithoutLoansInput, Prisma.MemberUncheckedUpdateWithoutLoansInput>;
};
export type MemberUpdateWithoutLoansInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MemberUncheckedUpdateWithoutLoansInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MemberCountOutputType = {
    loans: number;
};
export type MemberCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    loans?: boolean | MemberCountOutputTypeCountLoansArgs;
};
export type MemberCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberCountOutputTypeSelect<ExtArgs> | null;
};
export type MemberCountOutputTypeCountLoansArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoanWhereInput;
};
export type MemberSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    loans?: boolean | Prisma.Member$loansArgs<ExtArgs>;
    _count?: boolean | Prisma.MemberCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["member"]>;
export type MemberSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["member"]>;
export type MemberSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["member"]>;
export type MemberSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type MemberOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "email" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["member"]>;
export type MemberInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    loans?: boolean | Prisma.Member$loansArgs<ExtArgs>;
    _count?: boolean | Prisma.MemberCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MemberIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type MemberIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $MemberPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Member";
    objects: {
        loans: Prisma.$LoanPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        email: string;
        status: $Enums.MemberStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["member"]>;
    composites: {};
};
export type MemberGetPayload<S extends boolean | null | undefined | MemberDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MemberPayload, S>;
export type MemberCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MemberCountAggregateInputType | true;
};
export interface MemberDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Member'];
        meta: {
            name: 'Member';
        };
    };
    findUnique<T extends MemberFindUniqueArgs>(args: Prisma.SelectSubset<T, MemberFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MemberFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MemberFindFirstArgs>(args?: Prisma.SelectSubset<T, MemberFindFirstArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MemberFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MemberFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MemberFindManyArgs>(args?: Prisma.SelectSubset<T, MemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MemberCreateArgs>(args: Prisma.SelectSubset<T, MemberCreateArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MemberCreateManyArgs>(args?: Prisma.SelectSubset<T, MemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MemberCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MemberDeleteArgs>(args: Prisma.SelectSubset<T, MemberDeleteArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MemberUpdateArgs>(args: Prisma.SelectSubset<T, MemberUpdateArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MemberDeleteManyArgs>(args?: Prisma.SelectSubset<T, MemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MemberUpdateManyArgs>(args: Prisma.SelectSubset<T, MemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MemberUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MemberUpsertArgs>(args: Prisma.SelectSubset<T, MemberUpsertArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MemberCountArgs>(args?: Prisma.Subset<T, MemberCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MemberCountAggregateOutputType> : number>;
    aggregate<T extends MemberAggregateArgs>(args: Prisma.Subset<T, MemberAggregateArgs>): Prisma.PrismaPromise<GetMemberAggregateType<T>>;
    groupBy<T extends MemberGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MemberGroupByArgs['orderBy'];
    } : {
        orderBy?: MemberGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MemberFieldRefs;
}
export interface Prisma__MemberClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    loans<T extends Prisma.Member$loansArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Member$loansArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MemberFieldRefs {
    readonly id: Prisma.FieldRef<"Member", 'String'>;
    readonly name: Prisma.FieldRef<"Member", 'String'>;
    readonly email: Prisma.FieldRef<"Member", 'String'>;
    readonly status: Prisma.FieldRef<"Member", 'MemberStatus'>;
    readonly createdAt: Prisma.FieldRef<"Member", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Member", 'DateTime'>;
}
export type MemberFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where: Prisma.MemberWhereUniqueInput;
};
export type MemberFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where: Prisma.MemberWhereUniqueInput;
};
export type MemberFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where?: Prisma.MemberWhereInput;
    orderBy?: Prisma.MemberOrderByWithRelationInput | Prisma.MemberOrderByWithRelationInput[];
    cursor?: Prisma.MemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MemberScalarFieldEnum | Prisma.MemberScalarFieldEnum[];
};
export type MemberFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where?: Prisma.MemberWhereInput;
    orderBy?: Prisma.MemberOrderByWithRelationInput | Prisma.MemberOrderByWithRelationInput[];
    cursor?: Prisma.MemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MemberScalarFieldEnum | Prisma.MemberScalarFieldEnum[];
};
export type MemberFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where?: Prisma.MemberWhereInput;
    orderBy?: Prisma.MemberOrderByWithRelationInput | Prisma.MemberOrderByWithRelationInput[];
    cursor?: Prisma.MemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MemberScalarFieldEnum | Prisma.MemberScalarFieldEnum[];
};
export type MemberCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MemberCreateInput, Prisma.MemberUncheckedCreateInput>;
};
export type MemberCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MemberCreateManyInput | Prisma.MemberCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MemberCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    data: Prisma.MemberCreateManyInput | Prisma.MemberCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MemberUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MemberUpdateInput, Prisma.MemberUncheckedUpdateInput>;
    where: Prisma.MemberWhereUniqueInput;
};
export type MemberUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MemberUpdateManyMutationInput, Prisma.MemberUncheckedUpdateManyInput>;
    where?: Prisma.MemberWhereInput;
    limit?: number;
};
export type MemberUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MemberUpdateManyMutationInput, Prisma.MemberUncheckedUpdateManyInput>;
    where?: Prisma.MemberWhereInput;
    limit?: number;
};
export type MemberUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where: Prisma.MemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.MemberCreateInput, Prisma.MemberUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MemberUpdateInput, Prisma.MemberUncheckedUpdateInput>;
};
export type MemberDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where: Prisma.MemberWhereUniqueInput;
};
export type MemberDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MemberWhereInput;
    limit?: number;
};
export type Member$loansArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MemberDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
};
