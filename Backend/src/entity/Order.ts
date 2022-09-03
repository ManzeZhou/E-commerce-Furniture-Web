import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    ManyToOne
} from "typeorm";
import {OrderStatus} from "./OrderStatus";

import {User} from "./User";
import {PaymentType} from "./PaymentType";
import {PaymentStatus} from "./PaymentStatus";

// annotation

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    invoice: number

    @Column()
    totalQuantity: number;

    //总价 precision?
    @Column()
    totalPrice: number;

    @Column()
    taxRate: number;

    @Column()
    productName: string;

    @Column()
    price: string;

    @Column()
    media: string

    @Column("simple-json")
    categories: {
        arms: string;
        armPad: string;
        backSupport: string;
        caster: string;
        frameBase: string;
        size: string;
        tilt: string
    }

    @Column()
    categoryPrice: string;


    @Column()
    @CreateDateColumn()
    createdAt: Date

    // 多对一 多个order可以对应一个user
    @ManyToOne(() => User, user => user.orders)
    user: User;

    //多对一 多个order可以对应一个orderStatus
    @ManyToOne(() => OrderStatus, orderStatus => orderStatus.status)
    orderStatus: OrderStatus;


    //多对一 多个order可以对应一个payment type
    @ManyToOne(() => PaymentType, paymentType => paymentType.type)
    paymentType: PaymentType;

    @ManyToOne(() => PaymentStatus, paymentStatus => paymentStatus.status)
    paymentStatus: PaymentStatus;


}
