<div class="p-6 mt-3 bg-gray-900 rounded-lg">
    <h2 class="mb-6 text-xl font-semibold">Profile Account</h2>
    <p class="mb-6 text-gray-400">
        Manage your X-Practica account. All changes in your account will be applied to all of your
        workspace.
    </p>
    <div class="grid grid-cols-2 gap-6 mb-6">
        <div>
            <label class="block mb-1 text-gray-400"> PROFILE PHOTO </label>
            <img
                alt="User profile image"
                class="w-20 h-20 mb-4 rounded-full"
                src="https://images.unsplash.com/photo-1542157565-4607d82cf417?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM4fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D"
            />
            <label class="block mb-1 text-gray-400"> USERNAME </label>
            <input
                class="w-full p-2 mb-4 text-white bg-white rounded focus:border-slate-600 focus:ring-0 border-slate-700 bg-opacity-5"
                type="text"
                value="saasinterface"
            />
            <label class="block mb-1 text-gray-400"> EMAIL </label>
            <input
                class="w-full p-2 mb-4 text-white bg-white rounded focus:border-slate-600 focus:ring-0 border-slate-700 bg-opacity-5"
                type="email"
                value="saasinterface@gmail.com"
            />
            <label class="block mb-1 text-gray-400"> TIME FORMAT </label>
            <select
                class="w-full p-2 mb-4 text-white bg-white rounded focus:border-slate-600 focus:ring-0 border-slate-700 bg-opacity-5"
            >
                <option> Browser Default </option>
            </select>
            <label class="block mb-1 text-gray-400"> LANGUAGE </label>
            <select
                class="w-full p-2 mb-4 text-white bg-white rounded focus:border-slate-600 focus:ring-0 border-slate-700 bg-opacity-5"
            >
                <option> Browser Default </option>
            </select>
            <button
                class="w-full px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded hover:bg-red-600"
            >
                UPDATE
            </button>
        </div>
        <div>
            <label class="block mb-1 text-gray-400"> FULL NAME </label>
            <input
                class="w-full p-2 mb-4 text-white bg-white rounded focus:border-slate-600 focus:ring-0 border-slate-700 bg-opacity-5"
                type="text"
                value="SaaS Interface"
            />
            <label class="block mb-1 text-gray-400"> TIME ZONE </label>
            <select
                class="w-full p-2 mb-4 text-white bg-white rounded focus:border-slate-600 focus:ring-0 border-slate-700 bg-opacity-5"
            >
                <option> Europe/Rome (GMT+02:00) </option>
            </select>
            <label class="block mb-1 text-gray-400"> START OF THE WEEK </label>
            <select
                class="w-full p-2 mb-4 text-white bg-white rounded focus:border-slate-600 focus:ring-0 border-slate-700 bg-opacity-5"
            >
                <option> Sunday (Browser Default) </option>
            </select>
        </div>
    </div>
    <div class="w-1/2 pt-6 mt-6 border-t border-gray-700">
        <h2 class="mb-4 text-xl font-semibold">Delete Account</h2>
        <p class="mb-4 text-gray-400">
            Once you delete your account and account data, there is no going back.
        </p>
        <label class="block mb-1 text-gray-400"> DELETE YOUR ACCOUNT AND ACCOUNT DATA </label>
        <input
            class="w-full p-2 mb-4 text-white bg-white rounded focus:border-slate-600 focus:ring-0 border-slate-700 bg-opacity-5"
            placeholder="Confirm Email"
            type="email"
        />
        <button class="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600">
            DELETE ACCOUNT
        </button>
    </div>
</div>