interface Node {
  name: string;
  status: string;
  cpu: number;
  level: string;
  maxCpu: number;
  maxMemory: number;
  memory: number;
  sslFingerprint: string;
  uptime: number;
}

interface QemuVM {
  id: number;
  status: string;
  cpus: number;
  lock: string;
  maxDisk: number;
  memory: number;
  maxMemory: number;
  name: string;
  pid: number;
  qmpStatus: string;
  uptime: number;
}

interface Storage {
  name?: string;
  shared?: boolean;
  digest?: string | null;
  pool?: string | null;
  krbd?: string | null;
  type?: string;
  server?: string | null;
  encryptionKey?: string | null;
  datastore?: string | null;
  fingerprint?: string | null;
  pruneBackups?: string | null;
  username?: string | null;
  content?: string;
  path?: string | null;
  nodes?: string | null;
  disable?: string | null;
  share?: string | null;
  authSupported?: string | null;
  base?: string | null;
  blockSize?: string | null;
  bandwidthLimit?: string | null;
  comstarHostGroup?: string | null;
  comstarTargetGroup?: string | null;
  domain?: string | null;
  export?: string | null;
  format?: string | null;
  fuse?: string | null;
  isMountpoint?: string | null;
  lioTargetPortalGroup?: string | null;
  masterPublicKey?: string | null;
  maxFiles?: string | null;
  mkdir?: string | null;
  monitorHost?: string | null;
  mountpoint?: string | null;
  namespace?: string | null;
  nocow?: string | null;
  noWriteCache?: string | null;
  options?: string | null;
  password?: string | null;
  port?: string | null;
  portal?: string | null;
  safeRemove?: string | null;
  safeRemoveThroughput?: string | null;
  server2?: string | null;
  smbVersion?: string | null;
  sparse?: string | null;
  subDirectory?: string | null;
  taggedOnly?: string | null;
  target?: string | null;
  thinPool?: string | null;
  transport?: string | null;
  vgName?: string | null;
  volume?: string | null;
  available?: number;
  total: number;
  used?: number;
  usedFraction?: number;
  active?: boolean;
  iscsiProvider?: string | null;
  krdb?: boolean;
  disabled?: boolean;
}
interface Member {
  type: string;
  node: string;
  vmid: number;
  name: string;
}

interface Pool {
  id: string;
  comment: string;
  members: Member[];
}

interface FirewallRule {
  log: string;
  pos: number;
  enable: boolean;
  digest: string;
  action: string;
  comment?: string | null;
  source?: string | null;
  type: string;
  destinationPort: string;
  sourcePort?: string | null;
  ipVersion: number;
  destination: string;
  protocol: string;
  macro?: string | null;
  iface?: string | null;
  icmpType?: string | null;
  enabled: boolean;
}

export { Node, QemuVM, Storage, FirewallRule, Pool }
