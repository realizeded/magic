import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'component' })
export class Component {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    img: string;

    @Column('longtext')
    scriptPath: string;
}
