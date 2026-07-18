import { computed } from 'vue'
import { useRoleStore } from '@/stores/roleStore'
import { Role } from '@/types/enums/role'

export function useRole() {
  const store = useRoleStore()

  const currentRole = computed(() => store.currentRole)
  const isLeader = computed(() => store.isLeader)
  const isMember = computed(() => store.isMember)
  const hasRole = computed(() => store.hasRole)

  function setRole(role: Role) {
    store.setRole(role)
  }

  function clearRole() {
    store.clearRole()
  }

  function initializeRole() {
    store.initializeRole()
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
}
