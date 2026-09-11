#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/0b04e0bd06d87d68992288520cc765e19417cc64b2d63faed144dd6a224da887/contract';
import endContract from '../../snapshots/0b04e0bd06d87d68992288520cc765e19417cc64b2d63faed144dd6a224da887/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'case',
        columns: [
          col('caseNumber', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('caseType', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('clientId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('courtName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('filingDate', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'client',
        columns: [
          col('address', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'hearing',
        columns: [
          col('caseId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('courtName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('hearingDate', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('nextDate', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('purpose', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('result', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('passwordHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'case',
        constraint: 'case_caseNumber_key',
        columns: ['caseNumber'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'case',
        index: 'case_clientId_idx_153a9a49',
        columns: ['clientId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'case',
        index: 'case_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'client',
        index: 'client_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'hearing',
        index: 'hearing_caseId_idx_f7093793',
        columns: ['caseId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'case',
        foreignKey: {
          name: 'case_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'case',
        foreignKey: {
          name: 'case_clientId_fkey',
          columns: ['clientId'],
          references: { schema: 'public', table: 'client', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'client',
        foreignKey: {
          name: 'client_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'hearing',
        foreignKey: {
          name: 'hearing_caseId_fkey',
          columns: ['caseId'],
          references: { schema: 'public', table: 'case', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
