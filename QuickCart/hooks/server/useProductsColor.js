"use client"
import { useQuery} from '@tanstack/react-query';
import { storeService } from '@/services/color.service';

export function useStores() {
  return useQuery({
    queryKey: ['stores'],
    queryFn: storeService.getAll,
    staleTime: 10 * 60 * 1000,
  });
}
