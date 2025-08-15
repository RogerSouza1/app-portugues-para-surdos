import { useVideoPlayer, VideoPlayer } from 'expo-video';
import { useCallback, useEffect, useRef } from 'react';

export function useSafeVideoPlayer(source?: string | null, callback?: (player: VideoPlayer) => void) {
  const isReleasedRef = useRef(false);
  const isMountedRef = useRef(true);

  const player = useVideoPlayer(source || "", (player) => {
    if (isMountedRef.current && !isReleasedRef.current) {
      try {
        // Executar callback diretamente - não usar safePlay aqui
        callback?.(player);
      } catch (error) {
        console.warn('Erro no callback do player:', error);
      }
    }
  });

  // Função para verificar se podemos usar o player com segurança
  const canUsePlayer = useCallback(() => {
    return (
      player && 
      isMountedRef.current && 
      !isReleasedRef.current &&
      typeof player === 'object'
    );
  }, [player]);

  // Declarar todas as funções primeiro
  const safePause = useCallback(() => {
    if (!canUsePlayer()) return;
    
    try {
      if (player && 'pause' in player && typeof player.pause === 'function') {
        player.pause();
      }
    } catch (error) {
      console.warn('Erro ao pausar player:', error);
    }
  }, [player, canUsePlayer]);

  const safePlay = useCallback(() => {
    if (!canUsePlayer()) return;
    
    try {
      if (player && 'play' in player && typeof player.play === 'function') {
        player.play();
      }
    } catch (error) {
      console.warn('Erro ao reproduzir player:', error);
    }
  }, [player, canUsePlayer]);

  const safeRelease = useCallback(() => {
    if (isReleasedRef.current) return;
    
    // Marcar como liberado imediatamente para evitar múltiplas chamadas
    isReleasedRef.current = true;

    try {
      // Liberar diretamente, sem tentar pausar primeiro
      setTimeout(() => {
        try {
          if (player && typeof player === 'object' && 'release' in player) {
            player.release();
          }
        } catch (releaseError) {
          // Silenciar erros de release - são esperados quando o player já foi liberado
        }
      }, 50);
      
    } catch (error) {
      // Silenciar erros gerais de release
    }
  }, [player]);

  useEffect(() => {
    isMountedRef.current = true;
    isReleasedRef.current = false;
    
    return () => {
      isMountedRef.current = false;
      // Delay reduzido para release mais rápido
      setTimeout(() => {
        safeRelease();
      }, 100);
    };
  }, [safeRelease]);

  return {
    player,
    safePause,
    safePlay,
    safeRelease
  };
}
