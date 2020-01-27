import { ClassType, Field, ObjectType } from 'type-graphql';
import { IPage } from '../../models';

export default function PageTypeWrapper<T>(ClazzType: ClassType<T>) {
  @ObjectType(`Paginated${ClazzType.name}Response`)
  class PageType implements Required<IPage<T>> {
    @Field(() => [ClazzType])
    data: T[];

    @Field(() => Number)
    count: number;
  }

  return PageType;
}
