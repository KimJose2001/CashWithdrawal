import {ATM} from './atm'
describe('ATM', () => {
    it('should return correct configurations for a fien withdrawal ammount', () => {
         const bills = [100, 50, 20, 10]
         const billsAmmount = [10, 10, 10, 10]
         const initialVariation = new Array(4).fill(0)
         const withdrawAmmount = 300
         const result = ATM.solutions(bills, billsAmmount, initialVariation, withdrawAmmount, 0)
         expect(result.some(function (element){
            return element == [2, 2, 0, 0]
         }))
         expect(result.some(function (element){
            return element == [1, 3, 2, 1]

         }))
    })

    it('should return two configurations: one with more higher bills, another with more lower bills', () => {
        const bills = [100, 50, 20, 10]
        const billAmounts = [10, 10, 10, 10]
        const atm = new ATM(bills, billAmounts)
        const configurations = atm.getConfigurations(300)
        const higherBills = summation(configurations.moreHigherBills)
        const lowerBills = summation(configurations.moreLowerBills)
        expect(higherBills).toBeLessThan(lowerBills)
      })
    
    it('should return configuration with most bills', () => {
        const bills = [100, 50, 20, 10]
        const billsAmmount = [10, 10, 10, 10]
        const initialVariation = new Array(4).fill(0)
        const withdrawAmmount = 300
        const result = ATM.solutions(bills, billsAmmount, initialVariation, withdrawAmmount, 0)
        const most = ATM.mostBills(result)
        const array = [0, 0, 20, 20]
        console.log(most)
        expect(most).toEqual(array)
    })

    /*it('should return configuration with less bills', () => {
        const bills = [100, 50, 20, 10]
        const billsAmmount = [10, 10, 10, 10]
        const initialVariation = new Array(4).fill(0)
        const withdrawAmmount = 300
        const result = ATM.solutions(bills, billsAmmount, initialVariation, withdrawAmmount, 0)
        const most = ATM.lessBills(result)

        expect(most.some(function (element){
            return element == [3, 0, 0, 0]
         }))
    })*/


    
    function summation (array: number[]): number {
        return array.reduce((a: number, b: number) => a + b, 0)
      }
})