import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Role } from '@/types/enums/role'

const ROLE_KEY = 'lhcc-role'

export const useRoleStore = defineStore('role', () => {
  const currentRole = ref<Role | null>(null)

  const isLeader = computed(() => currentRole.value === Role.LEADER)
  const isMember = computed(() => currentRole.value === Role.MEMBER)
  const hasRole = computed(() => currentRole.value !== null)

  function setRole(role: Role) {
    currentRole.value = role
    localStorage.setItem(ROLE_KEY, role)
  }

  function clearRole() {
    currentRole.value = null
    localStorage.removeItem(ROLE_KEY)
  }

  function initializeRole() {
    const stored = localStorage.getItem(ROLE_KEY)
    if (stored && Object.values(Role).includes(stored as Role)) {
      currentRole.value = stored as Role
    }
  }

  return {
    currentRole,
    isLeader,
    isMember,
    hasRole,
    setRole,
    clearRole,
    initializeRole,
  }
})
