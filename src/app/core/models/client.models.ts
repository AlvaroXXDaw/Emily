export type ClientPlan = 'BASIC' | 'PREMIUM';

export interface Client {
  id: string;
  name: string;
  email: string;
  plan: ClientPlan;
  joinDate: string;
}

export interface CreateClientRequest {
  name: string;
  email: string;
  plan: ClientPlan;
}
