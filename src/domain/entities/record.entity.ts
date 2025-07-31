/* import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zone: string;
  
  @Column()
  timestamp: Date;

  @Column({ nullable: true })
  temperature: number;  
}
 */


export class Record {
  constructor(
    public zone: string,
    public timestamp: Date,
    public temperature: number,
  ) {}
}
