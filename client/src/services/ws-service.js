export class WSService {
    constructor(url) {
        this.url = url;
        this.ws = null;
        this.subs = new Set();
        this.listeners = new Set();
        this.reConnectDelay = 1000;
        this.maxReconnectDelay = 30000;
        this._backoffTimer = null;
    }

    connect() {
        if (this.ws) this.ws.close();
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            this.reConnectDelay = 1000;
            this._resubscribe();
        };

        this.ws.onmessage = (evt) => {
            console.log('[wsService] raw message:', evt.data);
            let msg;
            try {
                msg = JSON.parse(evt.data);
            } catch (e) {
                return;
            }
        };

        this.ws.onclose = () => {
            this._tryReconnect();
        };

        this.ws.onerror = () => {
            console.log('error');
        }
    }

    disconnect() {
        if (this._backoffTimer) {
            clearTimeout(this._backoffTimer);
            this._backoffTimer = null;
        }
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    send(obj) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(obj));
        }
    }

    subscribe(topic) {
        if (!topic) return;
        this.subs.add(topic);
        // отправляем подпись, если соединение открыто
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        // формат сообщения зависит от API (пример Bybit public)
        const msg = { op: 'subscribe', args: [topic] };
        this.ws.send(JSON.stringify(msg));
        } else {
        // соединение не открыто — подписка сохранена и будет восстановлена при connect()
        console.log('subscribe queued, will send on connect:', topic);
        }
    }

    unSubscribe(topic) {
        if (!topic) return;
        this.subs.delete(topic);
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        const msg = { op: 'unsubscribe', args: [topic] };
        this.ws.send(JSON.stringify(msg));
        }
    }

    subscribeTopic(topic) {
        this.subs.add(topic);
        this.send({
            op: 'subscribe',
            args: [topic]
        });
    }

    unSubscribeTopic(topic) {
        this.subs.delete(topic);
        this.send({
            op: 'unsubscribe',
            args: [topic]
        });
    }

    addListener(cb) {
        this.listeners.add(cb);
    }

    removeListener(cb) {
        this.listeners.delete(cb);
    }

    _resubscribe() {
        this.subs.forEach(t => this.send({
            op: 'subscribe',
            args: [t]
        }))
    }

    _tryReconnect() {
        if (this._backoffTimer) return;
        const delay = this.reConnectDelay;
        this._backoffTimer = setTimeout(() => {
            this._backoffTimer = null;
            this.connect();
            this.reConnectDelay = Math.min(
                this.reConnectDelay * 2, this.maxReconnectDelay
            );
        }, delay);
    }
}

export const wsService = new WSService('wss://stream.bybit.com/v5/public/spot')