/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  AccountRole,
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/web3.js';
import { TOKEN_2022_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';
import {
  getAccountStateDecoder,
  getAccountStateEncoder,
  type AccountState,
  type AccountStateArgs,
} from '../types';

export const UPDATE_DEFAULT_ACCOUNT_STATE_DISCRIMINATOR = 28;

export function getUpdateDefaultAccountStateDiscriminatorBytes() {
  return getU8Encoder().encode(UPDATE_DEFAULT_ACCOUNT_STATE_DISCRIMINATOR);
}

export const UPDATE_DEFAULT_ACCOUNT_STATE_DEFAULT_ACCOUNT_STATE_DISCRIMINATOR = 1;

export function getUpdateDefaultAccountStateDefaultAccountStateDiscriminatorBytes() {
  return getU8Encoder().encode(
    UPDATE_DEFAULT_ACCOUNT_STATE_DEFAULT_ACCOUNT_STATE_DISCRIMINATOR
  );
}

export type UpdateDefaultAccountStateInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountFreezeAuthority extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMint extends string
        ? WritableAccount<TAccountMint>
        : TAccountMint,
      TAccountFreezeAuthority extends string
        ? ReadonlyAccount<TAccountFreezeAuthority>
        : TAccountFreezeAuthority,
      ...TRemainingAccounts,
    ]
  >;

export type UpdateDefaultAccountStateInstructionData = {
  discriminator: number;
  defaultAccountStateDiscriminator: number;
  /** The state each new token account should start with. */
  accountState: AccountState;
};

export type UpdateDefaultAccountStateInstructionDataArgs = {
  /** The state each new token account should start with. */
  accountState: AccountStateArgs;
};

export function getUpdateDefaultAccountStateInstructionDataEncoder(): Encoder<UpdateDefaultAccountStateInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['defaultAccountStateDiscriminator', getU8Encoder()],
      ['accountState', getAccountStateEncoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: UPDATE_DEFAULT_ACCOUNT_STATE_DISCRIMINATOR,
      defaultAccountStateDiscriminator:
        UPDATE_DEFAULT_ACCOUNT_STATE_DEFAULT_ACCOUNT_STATE_DISCRIMINATOR,
    })
  );
}

export function getUpdateDefaultAccountStateInstructionDataDecoder(): Decoder<UpdateDefaultAccountStateInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['defaultAccountStateDiscriminator', getU8Decoder()],
    ['accountState', getAccountStateDecoder()],
  ]);
}

export function getUpdateDefaultAccountStateInstructionDataCodec(): Codec<
  UpdateDefaultAccountStateInstructionDataArgs,
  UpdateDefaultAccountStateInstructionData
> {
  return combineCodec(
    getUpdateDefaultAccountStateInstructionDataEncoder(),
    getUpdateDefaultAccountStateInstructionDataDecoder()
  );
}

export type UpdateDefaultAccountStateInput<
  TAccountMint extends string = string,
  TAccountFreezeAuthority extends string = string,
> = {
  /** The mint. */
  mint: Address<TAccountMint>;
  /** The mint freeze authority or its multisignature account. */
  freezeAuthority:
    | Address<TAccountFreezeAuthority>
    | TransactionSigner<TAccountFreezeAuthority>;
  accountState: UpdateDefaultAccountStateInstructionDataArgs['accountState'];
  multiSigners?: Array<TransactionSigner>;
};

export function getUpdateDefaultAccountStateInstruction<
  TAccountMint extends string,
  TAccountFreezeAuthority extends string,
>(
  input: UpdateDefaultAccountStateInput<TAccountMint, TAccountFreezeAuthority>
): UpdateDefaultAccountStateInstruction<
  typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountMint,
  (typeof input)['freezeAuthority'] extends TransactionSigner<TAccountFreezeAuthority>
    ? ReadonlySignerAccount<TAccountFreezeAuthority> &
        IAccountSignerMeta<TAccountFreezeAuthority>
    : TAccountFreezeAuthority
> {
  // Program address.
  const programAddress = TOKEN_2022_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    mint: { value: input.mint ?? null, isWritable: true },
    freezeAuthority: {
      value: input.freezeAuthority ?? null,
      isWritable: false,
    },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Remaining accounts.
  const remainingAccounts: IAccountMeta[] = (args.multiSigners ?? []).map(
    (signer) => ({
      address: signer.address,
      role: AccountRole.READONLY_SIGNER,
      signer,
    })
  );

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.freezeAuthority),
      ...remainingAccounts,
    ],
    programAddress,
    data: getUpdateDefaultAccountStateInstructionDataEncoder().encode(
      args as UpdateDefaultAccountStateInstructionDataArgs
    ),
  } as UpdateDefaultAccountStateInstruction<
    typeof TOKEN_2022_PROGRAM_ADDRESS,
    TAccountMint,
    (typeof input)['freezeAuthority'] extends TransactionSigner<TAccountFreezeAuthority>
      ? ReadonlySignerAccount<TAccountFreezeAuthority> &
          IAccountSignerMeta<TAccountFreezeAuthority>
      : TAccountFreezeAuthority
  >;

  return instruction;
}

export type ParsedUpdateDefaultAccountStateInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The mint. */
    mint: TAccountMetas[0];
    /** The mint freeze authority or its multisignature account. */
    freezeAuthority: TAccountMetas[1];
  };
  data: UpdateDefaultAccountStateInstructionData;
};

export function parseUpdateDefaultAccountStateInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedUpdateDefaultAccountStateInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 2) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      mint: getNextAccount(),
      freezeAuthority: getNextAccount(),
    },
    data: getUpdateDefaultAccountStateInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
