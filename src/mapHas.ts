interface ChaveValor {
    key: string;
    value: string;
    next: ChaveValor | null;
}

class HashMap {
    private capacity: number = 16;
    private loadFactor: number = 0.75;
    private size: number = 0;
    private buckets: (ChaveValor | null)[] = new Array(this.capacity).fill(null);

    constructor() { }

    private hash(key: string): number {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }
    private resize():void {
        this.capacity *= 2;
        const oldBuckets = this.buckets;
        this.buckets = new Array(this.capacity);
        this.size = 0
        for (let i = 0; i < oldBuckets.length; i++) {
            let current = oldBuckets[i];
            while (current) {
                this.set(current.key, current.value);
                current = current.next;
            }
        }
    }

    public set(key: string, value: string): void {
        const index = this.hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = listNode(key, value);
        } else {
            let current: (ChaveValor | null) = this.buckets[index];
            while (current) {
                if (current.key == key) {
                    current.value = value;
                    return;
                }
                if (!current.next) {
                    current.next = listNode(key, value);
                    break;
                }
                current = current.next;
            }
        }
        this.size++;
        if (this.size > this.capacity * this.loadFactor) {
            this.resize()
        }
    }


}
function listNode<K, V>(key: K, value: V): ChaveValor {
    return { key: key as string, value: value as string, next: null };
}