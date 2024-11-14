/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getOptionDecoder,
  getOptionEncoder,
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
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type Option,
  type OptionOrNullable,
  type WritableAccount,
} from '@solana/web3.js';
import { TOKEN_2022_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const INITIALIZE_CONFIDENTIAL_TRANSFER_FEE_DISCRIMINATOR = 37;

export function getInitializeConfidentialTransferFeeDiscriminatorBytes() {
  return getU8Encoder().encode(
    INITIALIZE_CONFIDENTIAL_TRANSFER_FEE_DISCRIMINATOR
  );
}

export const INITIALIZE_CONFIDENTIAL_TRANSFER_FEE_CONFIDENTIAL_TRANSFER_FEE_DISCRIMINATOR = 0;

export function getInitializeConfidentialTransferFeeConfidentialTransferFeeDiscriminatorBytes() {
  return getU8Encoder().encode(
    INITIALIZE_CONFIDENTIAL_TRANSFER_FEE_CONFIDENTIAL_TRANSFER_FEE_DISCRIMINATOR
  );
}

export type InitializeConfidentialTransferFeeInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountMint extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMint extends string
        ? WritableAccount<TAccountMint>
        : TAccountMint,
      ...TRemainingAccounts,
    ]
  >;

export type InitializeConfidentialTransferFeeInstructionData = {
  discriminator: number;
  confidentialTransferFeeDiscriminator: number;
  /** Optional authority to set the withdraw withheld authority ElGamal key */
  authority: Option<Address>;
  /** Withheld fees from accounts must be encrypted with this ElGamal key */
  withdrawWithheldAuthorityElGamalPubkey: Option<Address>;
};

export type InitializeConfidentialTransferFeeInstructionDataArgs = {
  /** Optional authority to set the withdraw withheld authority ElGamal key */
  authority: OptionOrNullable<Address>;
  /** Withheld fees from accounts must be encrypted with this ElGamal key */
  withdrawWithheldAuthorityElGamalPubkey: OptionOrNullable<Address>;
};

export function getInitializeConfidentialTransferFeeInstructionDataEncoder(): Encoder<InitializeConfidentialTransferFeeInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['confidentialTransferFeeDiscriminator', getU8Encoder()],
      [
        'authority',
        getOptionEncoder(getAddressEncoder(), {
          prefix: null,
          noneValue: 'zeroes',
        }),
      ],
      [
        'withdrawWithheldAuthorityElGamalPubkey',
        getOptionEncoder(getAddressEncoder(), {
          prefix: null,
          noneValue: 'zeroes',
        }),
      ],
    ]),
    (value) => ({
      ...value,
      discriminator: INITIALIZE_CONFIDENTIAL_TRANSFER_FEE_DISCRIMINATOR,
      confidentialTransferFeeDiscriminator:
        INITIALIZE_CONFIDENTIAL_TRANSFER_FEE_CONFIDENTIAL_TRANSFER_FEE_DISCRIMINATOR,
    })
  );
}

export function getInitializeConfidentialTransferFeeInstructionDataDecoder(): Decoder<InitializeConfidentialTransferFeeInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['confidentialTransferFeeDiscriminator', getU8Decoder()],
    [
      'authority',
      getOptionDecoder(getAddressDecoder(), {
        prefix: null,
        noneValue: 'zeroes',
      }),
    ],
    [
      'withdrawWithheldAuthorityElGamalPubkey',
      getOptionDecoder(getAddressDecoder(), {
        prefix: null,
        noneValue: 'zeroes',
      }),
    ],
  ]);
}

export function getInitializeConfidentialTransferFeeInstructionDataCodec(): Codec<
  InitializeConfidentialTransferFeeInstructionDataArgs,
  InitializeConfidentialTransferFeeInstructionData
> {
  return combineCodec(
    getInitializeConfidentialTransferFeeInstructionDataEncoder(),
    getInitializeConfidentialTransferFeeInstructionDataDecoder()
  );
}

export type InitializeConfidentialTransferFeeInput<
  TAccountMint extends string = string,
> = {
  /** The SPL Token mint. */
  mint: Address<TAccountMint>;
  authority: InitializeConfidentialTransferFeeInstructionDataArgs['authority'];
  withdrawWithheldAuthorityElGamalPubkey: InitializeConfidentialTransferFeeInstructionDataArgs['withdrawWithheldAuthorityElGamalPubkey'];
};

export function getInitializeConfidentialTransferFeeInstruction<
  TAccountMint extends string,
  TProgramAddress extends Address = typeof TOKEN_2022_PROGRAM_ADDRESS,
>(
  input: InitializeConfidentialTransferFeeInput<TAccountMint>,
  config?: { programAddress?: TProgramAddress }
): InitializeConfidentialTransferFeeInstruction<TProgramAddress, TAccountMint> {
  // Program address.
  const programAddress = config?.programAddress ?? TOKEN_2022_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    mint: { value: input.mint ?? null, isWritable: true },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [getAccountMeta(accounts.mint)],
    programAddress,
    data: getInitializeConfidentialTransferFeeInstructionDataEncoder().encode(
      args as InitializeConfidentialTransferFeeInstructionDataArgs
    ),
  } as InitializeConfidentialTransferFeeInstruction<
    TProgramAddress,
    TAccountMint
  >;

  return instruction;
}

export type ParsedInitializeConfidentialTransferFeeInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The SPL Token mint. */
    mint: TAccountMetas[0];
  };
  data: InitializeConfidentialTransferFeeInstructionData;
};

export function parseInitializeConfidentialTransferFeeInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitializeConfidentialTransferFeeInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 1) {
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
    },
    data: getInitializeConfidentialTransferFeeInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
