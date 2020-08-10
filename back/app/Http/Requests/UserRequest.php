<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\User;

class UserRequest extends FormRequest
{
    protected function failedValidation(Validator $validator){
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(){
        return [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|max:15',
            'gender' => 'required|max:1',
            'date_of_birth' => 'required',
        ];

    }

    public function messages(){
        return [
            // Mensagens personalizadas
            'name.string' => 'Você precisa digitar um nome',
            'password.min' => 'A senha deve conter no mínimo 9 digitos',
            'password.max' => 'A senha deve conter no máximo 15 digitos',
            'email.email' => 'Insira um email válido',
            'email.unique' => 'Este e-mail já existe',
        ];
    }
}
