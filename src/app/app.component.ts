import { Pessoa } from './models/pessoa.model';
import { Component } from '@angular/core';
import { CepService } from './service/cep.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import isEqual from 'lodash.isequal';
import { error } from '@angular/compiler/src/util';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	myForm: FormGroup;
	pessoas: Pessoa[];
	editando: boolean = false;
	showSpinner: Boolean = true;
	novaPessoa: boolean = false;
	index_: number = null;

	constructor(private fb: FormBuilder, private cepService: CepService) {
		this.createForm();
	}

	ngOnInit() {
		this.carregarTabela();
		this.myForm.reset();
		this.showSpinner = false;
	}

	createForm() {
		//const cep = this.fb.group({
		//	cep: ['', [Validators.required]],
		//	estado: ['',[Validators.required]/* { value: '', disabled: true } */],
		//	cidade: ['',[Validators.required]/* { value: '', disabled: true } */],
		//	rua: ['',[Validators.required] ]
		//}) 

		this.myForm = this.fb.group({
			nome: ['', [Validators.required]],
			cpf: ['', [Validators.required, Validators.pattern('[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}')]],
			telefone: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
			email: ['', [Validators.email, Validators.required]],
			cep: this.fb.group({
				cep: ['', [Validators.required, Validators.pattern('[0-9]{5}-?[0-9]{3}')]],
				estado: ['', [Validators.required]],
				cidade: ['', [Validators.required]],
				rua: ['', [Validators.required]]
			})
		})
	}

	editar(index: number) {
		this.editando = true;
		this.myForm.patchValue({
			nome: this.pessoas[index].nome,
			cpf: this.pessoas[index].cpf,
			telefone: this.pessoas[index].telefone,
			email: this.pessoas[index].email,
			cep: {
				cep: this.pessoas[index].cep.cep,
				estado: this.pessoas[index].cep.estado,
				cidade: this.pessoas[index].cep.cidade,
				rua: this.pessoas[index].cep.rua
			}
		})
		this.achaIndex(this.pessoas, this.myForm.value);
	}

	getCep() {
		if(this.myForm.value.cep.cep > 0) {
			if (this.myForm.value.cep.cep.includes('-')) {
				this.myForm.value.cep.cep = this.myForm.value.cep.cep.replace('-', '');
			}
	
			if (this.myForm.value.cep.cep.length === 8 || this.myForm.value.cep.cep.length === 9) {
				this.cepService.getCep(this.myForm.value.cep.cep).subscribe(data => {
					this.myForm.patchValue({
						cep: {
							cep: data.cep,
							estado: data.uf,
							cidade: data.localidade,
							rua: data.logradouro
						}
					})
				}, (err)=> alert(err.message));
			}
		}

	}

	cancelar() {
		this.myForm.reset();
		this.editando = false;
		this.novaPessoa = false;
	}

	salvar() {
		if (this.myForm.value.cpf < 999999999) {
			this.myForm.value.cpf = '0' + '0' + this.myForm.value.cpf
		}
		//creating new people
		if (this.novaPessoa) {
			this.pessoas.push(this.myForm.value);
			this.novaPessoa = false;
		}
		//modifying existing people.
		else {
			console.log(this.index_);
			this.pessoas[this.index_] = this.myForm.value;
		}
		this.editando = false;
		this.index_ = null;
		this.myForm.reset();
	}

	apagar() {
		this.pessoas.splice(this.index_, 1);
		this.editando = false;
		this.index_ = null;
	}

	achaIndex(obj1, obj2) {
		let resp: Boolean;
		for (let i = 0; i < this.pessoas.length; i++) {
			resp = isEqual(this.pessoas[i], this.myForm.value);
			if (resp) {
				this.index_ = i;
			}
		}
	}

	get nome_() {
		return this.myForm.get('nome');
	}
	get cpf_() {
		return this.myForm.get('cpf');
	}
	get telefone_() {
		return this.myForm.get('telefone');
	}
	get email_() {
		return this.myForm.get('email');
	}
	get cep_() {
		return this.myForm.get('cep.cep');
	}

	adicionarPessoa() {
		this.editando = true;
		this.myForm.reset();
		this.novaPessoa = true;
	}

	carregarTabela() {
		this.pessoas = [
			{
				nome: 'Maria Flores',
				cpf: '862.771.755-99',
				telefone: 6832233336,
				email: 'maria_f@gmail.com',
				cep: {
					cep: '69906-043',
					estado: 'AC',
					cidade: 'Rio Branco',
					rua: 'Rua Arnaldo Aleixo (Conjunto Canaã)'
				}
			},
			{
				nome: 'João Carlos',
				cpf: '030.746.245-58',
				telefone: 67813484873,
				email: 'joao.c@gmail.com',
				cep: {
					cep: '79096-766',
					estado: 'MS',
					cidade: 'Campo Grande',
					rua: 'Rua Rodolfho José Rospide da Motta'
				}
			},
			{
				nome: 'Stephanie Dias',
				cpf: '162.095.623-37',
				telefone: 21870392995,
				email: 'ste.dias@gmail.com',
				cep: {
					cep: '23825-080',
					estado: 'RJ',
					cidade: 'Itaguaí',
					rua: 'Rua Mario Bastos Filho'
				}
			},
			{
				nome: 'Mirtes Souza',
				cpf: '061.189.231-67',
				telefone: 71135677846,
				email: 'irma.mirtes@gmail.com',
				cep: {
					cep: '40420-150',
					estado: 'BA',
					cidade: 'Salvador',
					rua: '1ª Travessa Clóvis de Almeida Maia'
				}
			},
			{
				nome: 'Marcella Portela',
				cpf: '114.190.151-09',
				telefone: 61111103029,
				email: 'txela@outlook.com',
				cep: {
					cep: '70200-640',
					estado: 'DF',
					cidade: 'Brasília',
					rua: 'SGAS 604'
				}
			}
		]

	}
}