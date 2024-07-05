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
  note: string;
  protocol: string;
}

interface IptablesCommandResponseDTO {
  response: string;
  message: string;
  status: boolean;
}

interface ExecuteCommandRequestDTO {
  command: string;
}

interface ExecuteCommandResponseDTO {
  response: string;
  message: string;
  status: boolean;
}

export { NetworkRecord, NetworkRecordRequestDTO, IptablesCommandResponseDTO, ExecuteCommandRequestDTO, ExecuteCommandResponseDTO }
