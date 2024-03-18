interface NetworkRecord {
  id: string;
  outputIp: string;
  outputPort: string;
  inputIp: string;
  inputPort: string;
  note: string
  protocol: string
  fullNetworkRecord: string
}

interface NetworkRecordRequestDTO {
  outputIp: string;
  outputPort: string;
  inputIp: string;
  inputPort: string;
  note: string
  protocol: string
}

export { NetworkRecord, NetworkRecordRequestDTO }
