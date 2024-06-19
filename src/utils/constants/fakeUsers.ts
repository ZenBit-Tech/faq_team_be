import { EUserRole } from 'src/common/enums/user-role.enum';
import { EUserStatus } from 'src/common/enums/user-status.enum';

const ids = [
  '8a6e0804-2bd0-4672-b79d-d97027f9071a',
  'e7d3e89a-2b3d-4f7d-880e-bf8299fbf5b3',
  'cfe48439-5b61-4e2e-8a7d-9a5d7e2e93df',
  '5b7d087c-3d5d-43f0-8a3b-5e1e3d5b3a5d',
  '1a7e8f4a-6d3d-49e7-9a3b-6d3b5d3a6b7e',

  '8a7d3b5a-2d4e-4f6a-8a3e-7b6d5f3e5a6d',
  '6d3b4f5a-2e4d-4a7e-9b3d-8a3b5d3e5a7e',
  '5d4a7b3e-2f6d-4a3b-8e7d-9b6a5d4e3a7e',
  '4a7d3b5e-2d6e-4f8a-9b7d-8a3b5d6e4a7e',
  '9b3d5a7e-2e6d-4f8b-8a3e-7d6b5a3e4a7e',
];

const user_roles = [
  EUserRole.BUYER,
  EUserRole.BUYER,
  EUserRole.BUYER,
  EUserRole.BUYER,
  EUserRole.BUYER,

  EUserRole.VENDOR,
  EUserRole.VENDOR,
  EUserRole.VENDOR,
  EUserRole.VENDOR,
  EUserRole.VENDOR,
];
const full_names = [
  'Emily Jones',
  'John Doe',
  'Sarah Brown',
  'David Williams',
  'Michael Johnson',

  'Laura Davis',
  'Anna Wilson',
  'Jane Smith',
  'Robert Garcia',
  'Daniel Miller',
];
const emails = [
  'emily.jones@example.com',
  'john.doe@example.com',
  'sarah.brown@example.com',
  'david.williams@example.com',
  'michael.johnson@example.com',

  'laura.davis@example.com',
  'anna.wilson@example.com',
  'jane.smith@example.com',
  'robert.garcia@example.com',
  'daniel.miller@example.com',
];

const phone_numbers = [
  '14164531234',
  '16041234567',
  '19057892345',
  '15192346789',
  '14039876543',
  '16474567890',
  '16133214567',
  '12046543210',
  '19022345678',
  '17808765432',
];

const streetAddresses1 = [
  '123 Maple St',
  '456 Oak Ave',
  '789 Pine Rd',
  '101 Birch Blvd',
  '202 Cedar Cres',
  '303 Spruce Way',
  '404 Elm Dr',
  '505 Willow Ln',
  '606 Aspen Ct',
  '707 Fir St',
];

const users = [];

for (let i = 0; i < ids.length; i++) {
  const user = {
    id: ids[i],
    full_name: full_names[i],
    email: emails[i],
    password: 'password123',
    is_verified: true,
    filled_profile_step: 5,
    otp_code: '123456',
    user_status: EUserStatus.ACTIVE,
    is_deleted_by_admin: false,
    user_role: user_roles[i],
    avatar: null,
    phone: phone_numbers[i],
    address: streetAddresses1[i],
    address_2: '',
    country: 'Canada',
    state: 'Ontario',
    city: 'Vancouver',
    cloth_size: 'M',
    jeans_size: 'L',
    shoes_size: '8',
    stripe_id: null,
    payment_method_id: null,
  };

  users.push(user);
}

export { users };
