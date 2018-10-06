import fetch from 'node-fetch';

interface Programmer {
    name: string,
    framework: string,
    experience: number,
    available: boolean,
    [index: string]: string | number | boolean
}

type Filter = (Programmer) => boolean;

class RecruitmentAgency {
    private programmers;
    private key = 1;

    constructor(programmers?: Programmer[]) {
        if (programmers) {
            this.programmers = programmers.map(value => {
                value.id = this.key;
                this.key++;

                return value;
            })
        } else {
            this.programmers = [];
        }
    }

    public addProgrammer(programmer: Programmer) {
        programmer.id = this.key;
        this.key++;
        this.programmers = [...this.programmers, programmer];
    }

    public deleteProgrammer(programmer: Programmer) {
        this.programmers = this.programmers.filter(value => {
            const {id, ...eachProgrammer} = value;

            for(let key in eachProgrammer) {
                if(eachProgrammer[key] !== programmer[key]) {
                    return true;
                }
            }
            return false;
        });
    }

    public getAllProgrammers() {
        return this.programmers.map(value => {
            const { id, ...programer } = value;
            return programer;
        });
    }

    public getShowcase() {
        return ('Powitalny tekst! \n'+this.programmers.map(value => value.name).join('\n')).trim();
    }

    public updateProgrammer(programmer: Programmer, key: number) {
        this.programmers = this.programmers.map(value => {
            if (value.id === key) {
                programmer.id = value.id;
                return programmer;
            }

            return value;
        })
    }

    public getFilteredProgrammers(filter: Filter[]) {
        return this.programmers.filter(value => {
            let flag = true;
            filter.forEach(val => {
                const { id, ...programmer } = value;
                if (!val(programmer)) {
                    flag = false;
                }
            });

            if (flag) {
                const { id, ...programmer } = value;
                return programmer;
            }
        })
    }
}

const ra = new RecruitmentAgency();

fetch('https://files.gwo.pl/custom/random-data.json')
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(
                "Wystąpił błąd po połączeniu z serwerem: " +
                response.status
            );
        }
    })
    .then(data => data.map(value => ra.addProgrammer(value)))
    .then(() => console.log(ra.getAllProgrammers()))
    .catch(reason => console.error('Wystąpłił błąd przy próbie połączenia z serwerem:' + reason.toString()));
