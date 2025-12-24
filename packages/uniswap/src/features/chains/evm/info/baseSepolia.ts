import { GraphQLApi } from '@universe/api'
import { BASE_LOGO, ETH_LOGO } from 'ui/src/assets'
import { config } from 'uniswap/src/config'
import {
  DEFAULT_NATIVE_ADDRESS_LEGACY,
  DEFAULT_RETRY_OPTIONS,
  getQuicknodeEndpointUrl,
} from 'uniswap/src/features/chains/evm/rpc'
import { buildChainTokens } from 'uniswap/src/features/chains/evm/tokens'
import { GENERIC_L2_GAS_CONFIG } from 'uniswap/src/features/chains/gasDefaults'
import {
  GqlChainId,
  NetworkLayer,
  RPCType,
  UniverseChainId,
  UniverseChainInfo,
} from 'uniswap/src/features/chains/types'
import { Platform } from 'uniswap/src/features/platforms/types/Platform'
import { ElementName } from 'uniswap/src/features/telemetry/constants'
import { buildUSDC } from 'uniswap/src/features/tokens/stablecoin'
import { isWebApp } from 'utilities/src/platform'
import { baseSepolia } from 'wagmi/chains'

const tokens = buildChainTokens({
  stables: {
    USDC: buildUSDC('0x036CbD53842c5426634e7929541eC2318f3dCF7e', UniverseChainId.BaseSepolia),
  },
})

export const BASE_SEPOLIA_CHAIN_INFO = {
  ...baseSepolia,
  id: UniverseChainId.BaseSepolia,
  platform: Platform.EVM,
  backendChain: {
    chain: GraphQLApi.Chain.BaseSepolia as GqlChainId,
    backendSupported: true,
    nativeTokenBackendAddress: undefined,
  },
  blockPerMainnetEpochForChainId: 6,
  blockWaitMsBeforeWarning: isWebApp ? 1500000 : 600000,
  bridge: 'https://bridge.base.org/deposit',
  docs: 'https://docs.base.org/docs/',
  elementName: ElementName.ChainBaseSepolia,
  explorer: {
    name: 'BaseScan Sepolia',
    url: 'https://sepolia.basescan.org/',
    apiURL: 'https://api-sepolia.basescan.org',
  },
  openseaName: 'base-sepolia',
  interfaceName: 'baseSepolia',
  label: 'Base Sepolia',
  logo: BASE_LOGO,
  nativeCurrency: {
    name: 'Base Sepolia ETH',
    symbol: 'ETH',
    decimals: 18,
    address: DEFAULT_NATIVE_ADDRESS_LEGACY,
    explorerLink: 'https://sepolia.basescan.org/chart/etherprice',
    logo: ETH_LOGO,
  },
  networkLayer: NetworkLayer.L2,
  pendingTransactionsRetryOptions: DEFAULT_RETRY_OPTIONS,
  statusPage: 'https://status.base.org/',
  supportsV4: true,
  supportsNFTs: true,
  urlParam: 'base-sepolia',
  rpcUrls: {
    [RPCType.Public]: { http: [getQuicknodeEndpointUrl(UniverseChainId.BaseSepolia)] },
    [RPCType.Default]: { http: ['https://sepolia.base.org'] },
    [RPCType.Fallback]: { http: ['https://sepolia.base.org'] },
    [RPCType.Interface]: { http: [`https://base-sepolia.infura.io/v3/${config.infuraKey}`] },
  },
  assetRepoNetworkName: 'base-sepolia',
  tokens,
  wrappedNativeCurrency: {
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
    address: '0x4200000000000000000000000000000000000006',
  },
  gasConfig: GENERIC_L2_GAS_CONFIG,
  tradingApiPollingIntervalMs: 150,
  testnet: true,
} as const satisfies UniverseChainInfo
