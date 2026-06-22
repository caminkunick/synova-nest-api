import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // จะได้ตารางชื่อ 'setting' ใน MySQL อัตโนมัติ
export class Setting {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  setting_id!: number;

  @Column({ type: 'varchar', length: 45, nullable: true, collation: 'utf8mb4_general_ci' })
  code: string | null = null;

  @Column({ type: 'varchar', length: 45, nullable: true, collation: 'utf8mb4_general_ci' })
  value: string | null = null;

  @Column({ type: 'varchar', length: 255, nullable: true, collation: 'utf8mb4_general_ci' })
  description: string | null = null;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date = new Date();

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date = new Date();
}
