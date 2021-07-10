import { isRegExp } from "node:util"

export class ATM {
    private readonly bills: number[]
    private readonly billAmmounts: number[]

    constructor(bills: number[], billAmmounts: number[]){
        this.bills = bills.sort((a, b) => b - a)
        this.billAmmounts = billAmmounts
    }

    public getConfigurations (ammount: number): Configurations {
        const billsCopy = [...this.bills]
        const billAmountsCopy = [...this.billAmmounts]
        const initialVariation = new Array(this.bills.length).fill(0)
        const allSolutions = ATM.solutions(billsCopy, billAmountsCopy, initialVariation, ammount, 0)
        const configurations: Configurations = {
          moreHigherBills: allSolutions[0],
          moreLowerBills: allSolutions[allSolutions.length - 1]
        }
        return configurations
      }

    public static solutions (bills: number[], ammounts: number[], variation: number[], amount: number, position: number):
      number[][] {
        const list: number[][] = []
        const value: number = ATM.compute(bills, variation)
        if (value < amount) {
          for (let i = position; i < bills.length; i++) {
            if (ammounts[i] > variation[i]) {
              const newvariation: number[] = [...variation]
              newvariation[i]++
              const newList = ATM.solutions(bills, ammounts, newvariation, amount, i)
              if (newList != null) {
                list.push(...newList)
              }
            }
          }
        } else if (value === amount) {
          list.push(ATM.myCopy(variation))
        }
        return list
      }

    public static mostBills (list: number[][]): number[]{
        const aux = 0
        const temp = 0
        for(let i = 0; i < list.length; i++){
            if (aux < list[i].reduce((a: number, b: number) => a + b, 0)) {
                let aux = list[i].reduce((a: number, b: number) => a + b, 0)
                let temp = i
            }
        }
        return list[temp]
    }

    public static lessBills (list: number[][]): number[]{
        const aux = 100
        const temp = 0
        for(let i = 0; i < list.length; i++){
            if (aux > list[i].reduce((a: number, b: number) => a + b, 0)) {
                let aux = list[i].reduce((a: number, b: number) => a + b, 0)
                let temp = i
            }
        }
        return list[temp]
    }

    public static compute(bills: number[], variation: number[]): number{
        var ret = 0
        for (let i=0; i < variation.length; i++){
            ret += bills[i]*variation[i]
        }
        return ret
    }

    public static myCopy (ar: number[]): number[]{
        var ret: number[] = new Array(ar.length)
        for (let i = 0; i < ar.length; i++){
            ret[i] = ar[i]
        }
        return ret
    }
}

export interface Configurations {
    moreHigherBills: number[]
    moreLowerBills: number[]
  }