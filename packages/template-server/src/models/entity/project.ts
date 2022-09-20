import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: 'project'})
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("longtext")
    template: string;
}
