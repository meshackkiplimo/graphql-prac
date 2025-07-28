import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';

@ObjectType()
export class ServiceType {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    category: string;

    @Field(() => [String])
    tags: string[];

    @Field()
    summary: string;

    @Field()
    description: string;

    @Field()
    targetStakeholder: string;

   

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

@InputType()
export class EnquiryInput {
    @Field(() => ID)
    serviceId: string;

    @Field()
    userEmail: string;

    @Field()
    userName: string;

    @Field()
    message: string;
}

@ObjectType()
export class EnquiryResult {
    @Field()
    success: boolean;

    @Field(() => ID, { nullable: true })
    enquiryId?: string;

    @Field()
    message: string;
}

@ObjectType()
export class FollowResult {
    @Field()
    success: boolean;

    @Field(() => ID, { nullable: true })
    followId?: string;

    @Field()
    message: string;
}