import { ref, onMounted, onBeforeUnmount } from 'vue';
import { wsService } from '@/services/ws-service';

export function useWs() {
  const messages = ref([]);
  function onMsg(msg) {
    messages.value.unshift(msg);
    if (messages.value.length > 200) messages.value.pop();
  }

  onMounted(() => {
    wsService.addListener(onMsg);
    if (!wsService.ws) wsService.connect();
  });

  onBeforeUnmount(() => {
    wsService.removeListener(onMsg);
    // не отключаем сервис полностью, если другие компоненты могут его использовать
    // wsService.disconnect();
  });

  function subscribe(topic) { wsService.subscribeTopic(topic); }
  function unsubscribe(topic) { wsService.unsubscribeTopic(topic); }

  return { messages, subscribe, unsubscribe, send: wsService.send.bind(wsService) };
}
