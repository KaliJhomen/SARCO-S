"use client"
import { useQuery} from '@tanstack/react-query';
import { storeService } from '@/services/store.service';

export function useStores() {
  return useQuery({
    queryKey: ['stores'],
    queryFn: storeService.getAll,
    staleTime: 10 * 60 * 1000,
  });
}

export function useStore(id) {
  return useQuery({
    queryKey: ['store', id],
    queryFn: () => storeService.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}