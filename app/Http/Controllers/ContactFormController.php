<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactFormController extends Controller
{
    public function submit(Request $request)
    {

        $nom = $request->input("nom");
        $email = $request->input("email");
        $message = $request->input("message");
        Mail::to('karen@gmail.com')->send(new ContactMail(['nom' => $nom, 'email' => $email, 'messsage' => $message]));
        return back()->with('success', 'thaank you for contacting us');
    }
}
