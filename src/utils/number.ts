export function toPrice(value: number) {
    // just for demo, сойдет;
    return value.toLocaleString('en-US',{
        style: 'currency',
        currency: 'USD'
    })
}
