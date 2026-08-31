export type Gender = 'Mr' | 'Mrs';

export interface TestUser {
  name: string;
  email: string;
  password: string;
  title: Gender;
  birthDate: string;
  birthMonth: string;
  birthYear: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobileNumber: string;
}

const now = (): string => Date.now().toString(36);

export function buildUser(seed: string | number = 'local'): TestUser {
  const unique = `${now()}-${String(seed)}-${Math.random().toString(36).slice(2, 7)}`;

  return {
    name: `Test User ${seed}`,
    email: `pw-${unique}@example.com`,
    password: 'P@ssw0rd!23',
    title: 'Mr',
    birthDate: '12',
    birthMonth: 'March',
    birthYear: '1990',
    firstName: `Test${seed}`,
    lastName: `User${seed}`,
    company: 'Acme QA',
    address1: `${unique} Test Street`,
    address2: 'Suite 100',
    country: 'United States',
    zipcode: '12345',
    state: 'CA',
    city: 'San Francisco',
    mobileNumber: `+1${String(Date.now()).slice(-10)}`,
  };
}
