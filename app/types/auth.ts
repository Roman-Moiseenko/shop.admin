// ========================================================================
// Auth module DTOs
// ========================================================================

// ---- Staff ----
export interface StaffBase {
    id: number
    lastName: string
    firstName: string
    middleName: string | null
    position: string | null
    department: string | null
    workPhone: string | null
    personalPhone: string | null
    workEmail: string | null
    hireDate: string | null
    birthDate: string | null
    telegramChatId: string | null
    maxChatId: string | null
    notes: string | null
    terminated: boolean
}

export interface StaffCreateRequest {
    lastName: string
    firstName: string
    middleName?: string
    position: string
}

export interface StaffUpdateRequest extends StaffCreateRequest {
    department?: string
    workPhone?: string
    personalPhone?: string
    workEmail?: string
    hireDate?: string
    birthDate?: string
    telegramChatId?: string
    maxChatId?: string
    notes?: string
    terminated?: boolean
}

export interface StaffCreateUserRequest {
    active: boolean
    email: string
    password: string
    roleNames: string[]
}

// ---- Freelance ----
export interface FreelanceBase {
    id: number
    lastName: string
    firstName: string
    middleName: string | null
    position: string | null
    personalEmail: string | null
    personalPhone: string | null
    hireDate: string | null
    telegramChatId: string | null
    maxChatId: string | null
    notes: string | null
    terminated: boolean
}

export interface FreelanceCreateRequest {
    lastName: string
    firstName: string
    middleName?: string
    position: string
}

export interface FreelanceUpdateRequest {
    lastName: string
    firstName: string
    middleName?: string
    position: string
    personalEmail?: string
    personalPhone?: string
    hireDate?: string
    telegramChatId?: string
    maxChatId?: string
    notes?: string
    terminated?: boolean
}

export interface FreelanceCreateUserRequest {
    active: boolean
    email: string
    password: string
    roleNames: string[]
}

// ---- Client ----
export interface ClientBase {
    id: number
    lastName: string
    firstName: string
    middleName: string | null
    email: string | null
    phone: string | null
    birthDate: string | null
    gender: string | null
    country: string | null
    region: string | null
    city: string | null
    street: string | null
    postalCode: string | null
}

export interface ClientCreateRequest {
    lastName: string
    firstName: string
    middleName?: string
    email: string
    phone?: string
}

export interface ClientUpdateRequest {
    lastName: string
    firstName: string
    middleName?: string
    phone?: string
    email?: string
    birthDate?: string
    gender?: string
    country?: string
    region?: string
    city?: string
    street?: string
    postalCode?: string
}

export interface ClientProfileUpdateRequest extends ClientUpdateRequest {}

export interface ClientCredentialsRequest {
    currentEmail: string
    currentPassword: string
    newEmail?: string
    newPassword?: string
}

export interface ClientRegistrationRequest {
    lastName: string
    firstName: string
    middleName?: string
    email: string
    password: string
    phone?: string
    policyVersion: string
    actionIdentifier: string
}

// ---- Role ----
export interface RoleBase {
    id: number
    name: string
    description: string | null
    permissions: string[]
    type: 'system' | 'user'
    guard_name: string
}

export interface RoleCreateRequest {
    name: string
    description?: string
    permissions: string[]
}

export interface RoleUpdateRequest {
    name?: string
    description?: string
    permissions?: string[]
}

export interface PermissionGroup {
    /** Уникальный ключ роли, например 'employee' */
    role: string
    /** Название роли для отображения, например 'Персонал' */
    description: string
    /** Массив доступов, например 'auth.employee.create' */
    permissions: string[]
}
