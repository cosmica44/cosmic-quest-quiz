"use server"


export async function handleEmailSubmit(email, resultMessage) {
    console.log("inside handleEmailSubmit")
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CRM_API_KEY}`
      },
      body: JSON.stringify({
        email: email,
        customField: { 'Cjygcb9fkym82GADTt63': resultMessage }
      })
    });

    let data;

    if (res.ok) {
        data = await res.json();
        console.log("data: ", data);
    } 
  };